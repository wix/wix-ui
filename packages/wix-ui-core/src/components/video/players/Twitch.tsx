import * as React from 'react';
import {EventEmitter} from 'eventemitter3';
import isString = require('lodash/isString');
import uniqueId = require('lodash/uniqueId');
import {getSDK} from '../utils'
import {EVENTS, PROGRESS_INTERVAL} from '../constants';
import playerHOC from './playerHOC';
import {
  ICommonProps,
  IEventEmitter,
  IPropsToPlayer,
  IMethodsToPlayer,
  VerifierType,
  ITwitchPlayerAPI,
  ITwitchConfig,
  ISDKConfig,
} from '../types';
import styles from '../Video.st.css';

const VIDEO_URL_REGEX = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/;
const CHANNEL_URL_REGEX = /(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/;

export const verifier: VerifierType = url => isString(url) && (VIDEO_URL_REGEX.test(url) || CHANNEL_URL_REGEX.test(url));

const SDKConfig: ISDKConfig = {
  name: 'Twitch',
  url: 'https://player.twitch.tv/js/embed/v1.js',
  isRequireAllow: true,
  resolveRequire: sdk => ({Player: sdk.PlayerEmbed}),
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
};

const mapMethodsToPlayer: IMethodsToPlayer = {
  play: 'play',
  pause: 'pause',
  stop: instance => instance.reload(),
  getDuration: 'getDuration',
  getCurrentTime: 'getCurrentTime',
  seekTo: 'seek',
  getVolume: (instance, player) => 100 * player.getVolume(),
  setVolume: (instance, player, fraction) => player.setVolume(fraction / 100),
  isMuted: 'getMuted',
  mute: (instance, player) => player.setMuted(true),
  unMute: (instance, player) => player.setMuted(false),
};

interface ITwitchProps extends ICommonProps, ITwitchConfig {}

class TwitchPlayer extends React.PureComponent<ITwitchProps> {
  static displayName = 'Twitch';

  player: ITwitchPlayerAPI;
  playerID: string = uniqueId('twitch-player');
  eventEmitter: IEventEmitter;
  isDurationReady: boolean = false;
  durationTimeout: number;
  progressTimeout: number;

  constructor(props: ITwitchProps) {
    super(props);

    this.eventEmitter = new EventEmitter();
  }

  componentDidMount() {
    getSDK(SDKConfig)
      .then(this.initPlayer)
      .catch(error => {
        this.props.onError(error);
      })
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy();
    }
    this.eventEmitter.removeAllListeners();
    this.stopProgress();
    this.stopAwaitDuration();
  }

  initPlayer = Twitch => {
    const {playing, muted, playerOptions, onInit, onReady} = this.props;
    const src = this.props.src as string;
    const isChannel = CHANNEL_URL_REGEX.test(src);
    const id = isChannel ? src.match(CHANNEL_URL_REGEX)[1] : src.match(VIDEO_URL_REGEX)[1];
    const { READY, PLAY, PAUSE, ENDED } = Twitch.Player;

    this.player = new Twitch.Player(this.playerID, {
      video: isChannel ? '' : id,
      channel: isChannel ? id : '',
      height: '100%',
      width: '100%',
      playsinline: true,
      autoplay: playing,
      muted,
      ...playerOptions
    });

    this.player.addEventListener(READY, () => {
      this.awaitDuration();
      onReady();
    });

    this.player.addEventListener(PLAY, () => {
      this.eventEmitter.emit(EVENTS.PLAYING);
      this.progress();
    });

    this.player.addEventListener(PAUSE, () => {
      this.eventEmitter.emit(EVENTS.PAUSED);
      this.stopProgress();
    });

    this.player.addEventListener(ENDED, () => {
      this.eventEmitter.emit(EVENTS.ENDED);
      this.stopProgress();
    });

    onInit(this.player);
  }

  awaitDuration = () => {
    if (!this.isDurationReady) {
      const duration = this.player.getDuration();

      if (duration) {
        this.isDurationReady = true;
        this.props.onDuration(duration);
      }
    }

    this.durationTimeout = window.setTimeout(this.awaitDuration, PROGRESS_INTERVAL);
  }

  stopAwaitDuration() {
    window.clearTimeout(this.durationTimeout);
  }

  progress = () => {
    this.stopProgress();

    this.props.onProgress(this.player.getCurrentTime() || 0);
    this.progressTimeout = window.setTimeout(this.progress, PROGRESS_INTERVAL);
  }

  stopProgress() {
    window.clearTimeout(this.progressTimeout);
  }

  render() {
    return (
      <div
        id={this.playerID}
        className={styles.playerContainer}
        data-player-name="Twitch"
      />
    )
  }
}

export const Player: React.ComponentType<any> = playerHOC(TwitchPlayer, mapPropsToPlayer, mapMethodsToPlayer);
