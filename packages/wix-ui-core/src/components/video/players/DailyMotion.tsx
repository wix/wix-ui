import * as React from 'react';
import { EventEmitter } from 'eventemitter3';
const isString = require('lodash/isString');
import { getSDK } from '../utils';
import { EVENTS, PROGRESS_INTERVAL } from '../constants';
import playerHOC from './playerHOC';
import {
  ICommonProps,
  IEventEmitter,
  IPropsToPlayer,
  IMethodsToPlayer,
  VerifierType,
  IDailyMotionPlayerAPI,
  IDailyMotionConfig,
  ISDKConfig,
  PlayerNameType,
} from '../types';
import { classes } from '../Video.st.css';

const URL_REGEX = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/;

export const verifier: VerifierType = url =>
  isString(url) && URL_REGEX.test(url as string);

const SDKConfig: ISDKConfig = {
  name: 'DM',
  url: 'https://api.dmcdn.net/all.js',
  onReady: 'dmAsyncInit',
  isLoaded: DM => !!DM.player,
  isRequireAllow: false,
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
  muted: 'setMuted',
  volume: (instance, player, nextVolume) => player.setVolume(nextVolume / 100),
  controls: 'setControls',
};

const mapMethodsToPlayer: IMethodsToPlayer = {
  play: 'play',
  pause: 'pause',
  stop: instance => instance.reload(),
  getDuration: (instance, player) => player.duration || 0,
  getCurrentTime: (instance, player) => player.currentTime || 0,
  seekTo: 'setCurrentTime',
  getVolume: (instance, player) => 100 * player.volume,
  setVolume: (instance, player, fraction) => player.setVolume(fraction / 100),
  isMuted: (instance, player) => player.muted,
  mute: (instance, player) => player.setMuted(true),
  unMute: (instance, player) => player.setMuted(false),
};

interface IDailyMotionProps extends ICommonProps, IDailyMotionConfig {}

class DailyMotionPlayer extends React.PureComponent<IDailyMotionProps> {
  static displayName = 'DailyMotion';
  static playerName: PlayerNameType = 'dailymotion';

  player: IDailyMotionPlayerAPI;
  eventEmitter: IEventEmitter;
  containerRef: React.RefObject<HTMLDivElement>;
  progressTimeout: number;

  constructor(props: IDailyMotionProps) {
    super(props);

    this.containerRef = React.createRef();
    this.eventEmitter = new EventEmitter();
  }

  componentDidMount() {
    getSDK(SDKConfig)
      .then(this.initPlayer)
      .catch(error => {
        this.props.onError(error);
      });
  }

  componentWillUnmount() {
    this.eventEmitter.removeAllListeners();
    this.stopProgress();
  }

  initPlayer = DM => {
    const {
      playing,
      muted,
      controls,
      showTitle,
      playerOptions,
      onInit,
      onReady,
      onDuration,
      onError,
    } = this.props;
    const src = this.props.src as string;
    const [, id] = src.match(URL_REGEX);

    this.player = new DM.player(this.containerRef.current, {
      width: '100%',
      height: '100%',
      video: id,
      params: {
        controls,
        autoplay: playing,
        mute: muted,
        'ui-start-screen-info': showTitle,
        origin: window.location.origin,
        ...playerOptions,
      },
      events: {
        apiready: () => {
          onReady();
        },
        durationchange: () => {
          onDuration(this.player.duration);
        },
        playing: () => {
          this.eventEmitter.emit(EVENTS.PLAYING);
          this.progress();
        },
        pause: () => {
          this.eventEmitter.emit(EVENTS.PAUSED);
          this.stopProgress();
        },
        video_end: () => {
          this.eventEmitter.emit(EVENTS.ENDED);
          this.stopProgress();
        },
        error: event => onError(event),
      },
    });

    onInit(this.player, DailyMotionPlayer.playerName);
  };

  progress = () => {
    this.stopProgress();

    this.props.onProgress(this.player.currentTime || 0);
    this.progressTimeout = window.setTimeout(this.progress, PROGRESS_INTERVAL);
  };

  stopProgress() {
    window.clearTimeout(this.progressTimeout);
  }

  render() {
    return (
      <div className={classes.playerContainer} data-player-name="DailyMotion">
        <div ref={this.containerRef} />
      </div>
    );
  }
}

export const Player: React.ComponentType<any> = playerHOC(
  DailyMotionPlayer,
  mapPropsToPlayer,
  mapMethodsToPlayer,
);
