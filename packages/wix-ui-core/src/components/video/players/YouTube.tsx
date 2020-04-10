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
  IYoutubePlayerAPI,
  IYouTubeMotionConfig,
  ISDKConfig,
  PlayerNameType,
} from '../types';
import { classes } from '../Video.st.css';

const URL_REGEX = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;

export const verifier: VerifierType = url =>
  isString(url) && URL_REGEX.test(url as string);

const SDKConfig: ISDKConfig = {
  name: 'YT',
  url: 'https://www.youtube.com/iframe_api',
  onReady: 'onYouTubeIframeAPIReady',
  isLoaded: YT => !!YT.loaded,
  isRequireAllow: false,
};

const mapPropsToPlayer: IPropsToPlayer = {
  src: instance => instance.reload(),
  playing: (instance, player, nextPlaying) => {
    if (nextPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  },
  muted: (instance, player, nextMuted) => {
    if (nextMuted) {
      player.mute();
    } else {
      player.unMute();
    }
  },
  volume: 'setVolume',
  loop: instance => {
    // We reinit player to set(based on 'loop' prop) playlist, which is needed to play video in loop.
    instance.reload();
  },
};

const mapMethodsToPlayer: IMethodsToPlayer = {
  play: 'playVideo',
  pause: 'pauseVideo',
  stop: 'stopVideo',
  getDuration: 'getDuration',
  getCurrentTime: 'getCurrentTime',
  seekTo: 'seekTo',
  getVolume: 'getVolume',
  setVolume: 'setVolume',
  isMuted: 'isMuted',
  mute: 'mute',
  unMute: 'unMute',
};

interface IYouTubeProps extends ICommonProps, IYouTubeMotionConfig {}

class YouTubePlayer extends React.PureComponent<IYouTubeProps> {
  static displayName = 'YouTube';
  static playerName: PlayerNameType = 'youtube';

  player: IYoutubePlayerAPI;
  eventEmitter: IEventEmitter;
  containerRef: React.RefObject<HTMLDivElement>;
  progressTimeout: number;

  constructor(props: IYouTubeProps) {
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
    if (this.player) {
      this.player.destroy();
    }
    this.eventEmitter.removeAllListeners();
    this.stopProgress();
  }

  initPlayer = YT => {
    const {
      playing,
      muted,
      controls,
      loop,
      playerOptions,
      onInit,
      onReady,
      onDuration,
      onError,
    } = this.props;
    const src = this.props.src as string;
    const videoId = src.match(URL_REGEX)[1];

    this.player = new YT.Player(this.containerRef.current, {
      width: '100%',
      height: '100%',
      videoId,
      playerVars: {
        autoplay: playing ? 1 : 0,
        mute: muted ? 1 : 0,
        controls: controls ? 1 : 0,
        loop: loop ? 1 : 0,
        origin: window.location.origin,
        playsinline: 1,
        ...(loop && { playlist: videoId }),
        ...playerOptions,
      },
      events: {
        onReady: () => {
          onReady();
          onDuration(this.player.getDuration());
        },
        onStateChange: this.onStateChange(YT.PlayerState),
        onError,
      },
    });

    onInit(this.player, YouTubePlayer.playerName);
  };

  onStateChange = (PlayerState: any) => ({ data }): void => {
    const { PLAYING, PAUSED, ENDED } = PlayerState;

    switch (data) {
      case PLAYING:
        this.eventEmitter.emit(EVENTS.PLAYING);
        this.progress();
        break;
      case PAUSED:
        this.eventEmitter.emit(EVENTS.PAUSED);
        this.stopProgress();
        break;
      case ENDED:
        this.eventEmitter.emit(EVENTS.ENDED);
        this.stopProgress();
        break;
      default:
    }
  };

  progress = () => {
    this.stopProgress();

    this.props.onProgress(this.player.getCurrentTime() || 0);
    this.progressTimeout = window.setTimeout(this.progress, PROGRESS_INTERVAL);
  };

  stopProgress() {
    window.clearTimeout(this.progressTimeout);
  }

  render() {
    return (
      <div
        ref={this.containerRef}
        className={classes.playerContainer}
        data-player-name="YouTube"
      />
    );
  }
}

export const Player: React.ComponentType<any> = playerHOC(
  YouTubePlayer,
  mapPropsToPlayer,
  mapMethodsToPlayer,
);
