import * as React from 'react';
import {EventEmitter} from 'eventemitter3';
import isString = require('lodash/isString');
import uniqueId = require('lodash/uniqueId');
import {getSDK} from '../utils'
import playerHOC from './playerHOC';
import {EVENTS, PROGRESS_INTERVAL} from '../constants';
import {
  ICommonProps,
  IEventEmitter,
  IPropsToPlayer,
  IMethodsToPlayer,
  VerifierType,
  IFacebookPlayerAPI,
  IFacebookConfig,
  ISDKConfig
} from '../types';
import styles from '../Video.st.css';

const URL_REGEX = /facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;

export const verifier: VerifierType = url => isString(url) && URL_REGEX.test(url);

const SDKConfig: ISDKConfig = {
  name: 'FB',
  url: '//connect.facebook.net/en_US/sdk.js',
  onReady: 'fbAsyncInit',
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
  muted: (instance, player, nextMuted) => {
    if (nextMuted) {
      player.mute();
    } else {
      player.unmute();
    }
  },
  volume: (instance, player, nextVolume) => player.setVolume(nextVolume / 100),
};

const mapMethodsToPlayer: IMethodsToPlayer = {
  play: 'play',
  pause: 'pause',
  stop: instance => instance.reload(),
  getDuration: 'getDuration',
  getCurrentTime: 'getCurrentPosition',
  seekTo: 'seek',
  getVolume: (instance, player) => 100 * player.getVolume(),
  setVolume: (instance, player, fraction) => player.setVolume(fraction / 100),
  isMuted: 'isMuted',
  mute: 'mute',
  unMute: 'unmute',
};

interface IFacebookProps extends ICommonProps, IFacebookConfig {}

class FacebookPlayer extends React.PureComponent<IFacebookProps> {
  static displayName = 'Facebook';

  player: IFacebookPlayerAPI;
  playerID: string = uniqueId('facebook-player-');
  eventEmitter: IEventEmitter;
  isDurationReady: boolean = false;
  durationTimeout: number;
  progressTimeout: number;

  constructor(props: IFacebookProps) {
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
    this.eventEmitter.removeAllListeners();
    this.stopAwaitDuration();
    this.stopProgress();
  }

  initPlayer = FB => {
    const {appId, muted, onReady, onError} = this.props;

    FB.init({
      appId,
      xfbml: true,
      version: 'v2.5'
    });

    FB.Event.subscribe('xfbml.ready', msg => {
      if (msg.type === 'video' && msg.id === this.playerID) {
        this.player = msg.instance;

        this.player.subscribe('startedPlaying', () => {
          this.eventEmitter.emit(EVENTS.PLAYING);
          this.progress();
        });

        this.player.subscribe('paused', () => {
          this.eventEmitter.emit(EVENTS.PAUSED);
          this.stopProgress();
        });

        this.player.subscribe('finishedPlaying', () => {
          this.eventEmitter.emit(EVENTS.ENDED);
          this.stopProgress();
        });

        this.player.subscribe('error', onError);

        if (!muted) {
          this.player.unmute();
        }

        this.awaitDuration();
        onReady();
      }
    })
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

    this.props.onProgress(this.player.getCurrentPosition() || 0);
    this.progressTimeout = window.setTimeout(this.progress, PROGRESS_INTERVAL);
  }

  stopProgress() {
    window.clearTimeout(this.progressTimeout);
  }

  render() {
    const { src, playing, controls } = this.props;

    return (
      <div
        className={`fb-video ${styles.playerContainer}`}
        id={this.playerID}
        data-href={src}
        data-autoplay={playing ? 'true' : 'false'}
        data-allowfullscreen="true"
        data-controls={controls ? 'true' : 'false'}
        data-player-name="Facebook"
      />
    )
  }
}

export const Player: React.ComponentType<any> = playerHOC(FacebookPlayer, mapPropsToPlayer, mapMethodsToPlayer);
