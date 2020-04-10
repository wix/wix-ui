import * as React from 'react';
import { EventEmitter } from 'eventemitter3';
const isString = require('lodash/isString');
import { getSDK } from '../utils';
import { EVENTS } from '../constants';
import playerHOC from './playerHOC';
import {
  ICommonProps,
  IEventEmitter,
  IPropsToPlayer,
  IMethodsToPlayer,
  VerifierType,
  IVimeoPlayerAPI,
  IVimeoConfig,
  ISDKConfig,
  PlayerNameType,
} from '../types';
import { classes } from '../Video.st.css';

const URL_REGEX = /vimeo\.com\/.+/;

export const verifier: VerifierType = url =>
  isString(url) && URL_REGEX.test(url as string);

const SDKConfig: ISDKConfig = {
  name: 'Vimeo',
  url: 'https://player.vimeo.com/api/player.js',
  isRequireAllow: true,
  resolveRequire: sdk => ({ Player: sdk }),
};

const mapPropsToPlayer: IPropsToPlayer = {
  src: instance => instance.reload(),
  playing: (instance, player, nextPlaying) => {
    if (nextPlaying) {
      player.play();
    } else {
      player.pause();
    }
  },
  muted: (instance, player, nextMuted) => {
    if (nextMuted) {
      player.setVolume(0);
    } else {
      player.setVolume(instance.props.volume / 100);
    }
  },
  volume: (instance, player, nextVolume) => player.setVolume(nextVolume / 100),
};

const mapMethodsToPlayer: IMethodsToPlayer = {
  play: 'play',
  pause: 'pause',
  stop: 'unload',
  getDuration: instance => instance.ref.duration,
  getCurrentTime: instance => instance.ref.currentTime,
  seekTo: 'setCurrentTime',
  getVolume: instance => instance.ref.volume,
  setVolume: (instance, player, fraction) => player.setVolume(fraction / 100),
  isMuted: instance => instance.ref.volume === 0,
  mute: (instance, player) => player.setVolume(0),
  unMute: (instance, player) => player.setVolume(1),
};

interface IVimeoProps extends ICommonProps, IVimeoConfig {}

class VimeoPlayer extends React.PureComponent<IVimeoProps> {
  static displayName = 'Vimeo';
  static playerName: PlayerNameType = 'vimeo';

  player: IVimeoPlayerAPI;
  eventEmitter: IEventEmitter;
  containerRef: React.RefObject<HTMLDivElement>;
  duration: number = 0;
  currentTime: number = 0;
  volume: number;

  constructor(props: IVimeoProps) {
    super(props);

    this.containerRef = React.createRef();
    this.eventEmitter = new EventEmitter();
    this.volume = props.volume;
  }

  componentDidMount() {
    getSDK(SDKConfig)
      .then(this.initPlayer)
      .catch(error => {
        this.props.onError(error);
      });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy();
    }
    this.eventEmitter.removeAllListeners();
  }

  initPlayer = Vimeo => {
    const {
      src,
      playing,
      muted,
      loop,
      showTitle,
      playerOptions,
      onInit,
      onReady,
      onDuration,
      onProgress,
      onError,
    } = this.props;

    this.player = new Vimeo.Player(this.containerRef.current, {
      url: src,
      autoplay: playing,
      muted,
      loop,
      title: showTitle,
      ...playerOptions,
    });

    this.player.ready().then(() => {
      onReady();

      this.player.getDuration().then(duration => {
        this.duration = duration;
        onDuration(duration);
      });
    });

    this.player.on('play', () => {
      this.eventEmitter.emit(EVENTS.PLAYING);
    });

    this.player.on('pause', () => {
      this.eventEmitter.emit(EVENTS.PAUSED);
    });

    this.player.on('ended', () => {
      this.eventEmitter.emit(EVENTS.ENDED);
    });

    this.player.on('volumechange', ({ volume }) => {
      this.volume = volume * 100;
    });

    this.player.on('timeupdate', ({ seconds }) => {
      this.currentTime = seconds;
      onProgress(seconds);
    });

    this.player.on('error', onError);

    onInit(this.player, VimeoPlayer.playerName);
  };

  render() {
    return (
      <div
        ref={this.containerRef}
        className={classes.playerContainer}
        data-player-name="Vimeo"
      />
    );
  }
}

export const Player: React.ComponentType<any> = playerHOC(
  VimeoPlayer,
  mapPropsToPlayer,
  mapMethodsToPlayer,
);
