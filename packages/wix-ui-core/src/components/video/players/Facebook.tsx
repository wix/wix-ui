import * as React from 'react';
import { EventEmitter } from 'eventemitter3';
const isString = require('lodash/isString');
const uniqueId = require('lodash/uniqueId');
import { getSDK } from '../utils';
import playerHOC from './playerHOC';
import { EVENTS, PROGRESS_INTERVAL } from '../constants';
import {
  ICommonProps,
  IEventEmitter,
  IPropsToPlayer,
  IMethodsToPlayer,
  VerifierType,
  IFacebookPlayerAPI,
  IFacebookConfig,
  ISDKConfig,
} from '../types';
import styles from '../Video.st.css';

const URL_REGEX = /facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;

export const verifier: VerifierType = url =>
  isString(url) && URL_REGEX.test(url as string);

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

const parseSize = (value: number) => Math.ceil(value) || 'auto';

class FacebookPlayer extends React.PureComponent<IFacebookProps> {
  static displayName = 'Facebook';

  player: IFacebookPlayerAPI;
  playerId: string = uniqueId('facebook-player-');
  eventEmitter: IEventEmitter;
  containerRef: React.RefObject<HTMLDivElement>;
  isDurationReady: boolean = false;
  durationTimeout: number;
  progressTimeout: number;
  parser: (element?: HTMLElement) => void;
  unsubscribeFBEvents: Function = () => null;

  constructor(props: IFacebookProps) {
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
    this.unsubscribeFBEvents();
    this.stopAwaitDuration();
    this.stopProgress();

    this.parser = null;
  }

  componentDidUpdate(prevProps: IFacebookProps) {
    if (
      (this.props.width !== prevProps.width ||
        this.props.height !== prevProps.height) &&
      this.parser
    ) {
      this.parser(this.containerRef.current.parentElement);
    }
  }

  initPlayer = FB => {
    const { appId } = this.props;

    FB.init({
      appId,
      xfbml: true,
      version: 'v2.5',
    });

    FB.Event.subscribe('xfbml.ready', this.handleReady);
    FB.Event.subscribe('iframeplugin:create', this.setAllowAttribute);

    this.unsubscribeFBEvents = () => {
      FB.Event.unsubscribe('xfbml.ready', this.handleReady);
      FB.Event.unsubscribe('iframeplugin:create', this.setAllowAttribute);
    };

    this.parser = FB.XFBML.parse;
  };

  handleReady = msg => {
    const { muted, onInit, onReady, onError } = this.props;

    if (msg.type === 'video' && msg.id === this.playerId) {
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

      onInit(this.player);
      onReady();
    }
  };

  awaitDuration = () => {
    if (!this.isDurationReady) {
      const duration = this.player.getDuration();

      if (duration) {
        this.isDurationReady = true;
        this.props.onDuration(duration);
      }
    }

    this.durationTimeout = window.setTimeout(
      this.awaitDuration,
      PROGRESS_INTERVAL,
    );
  };

  stopAwaitDuration() {
    window.clearTimeout(this.durationTimeout);
  }

  progress = () => {
    this.stopProgress();

    this.props.onProgress(this.player.getCurrentPosition() || 0);
    this.progressTimeout = window.setTimeout(this.progress, PROGRESS_INTERVAL);
  };

  stopProgress() {
    window.clearTimeout(this.progressTimeout);
  }

  setAllowAttribute = () => {
    if (!this.containerRef.current) {
      return;
    }

    const iframe = this.containerRef.current.querySelector('iframe');

    if (!iframe) {
      return;
    }

    iframe.setAttribute('allow', 'autoplay; encrypted-media');
  };

  render() {
    const { src, playing, controls, width, height } = this.props;

    return (
      <div
        ref={this.containerRef}
        id={this.playerId}
        className={`fb-video ${styles.playerContainer}`}
        data-href={src}
        data-width={parseSize(width)}
        data-height={parseSize(height)}
        data-autoplay={playing ? 'true' : 'false'}
        data-allowfullscreen="true"
        data-controls={controls ? 'true' : 'false'}
        data-player-name="Facebook"
        data-hook="player-container"
      />
    );
  }
}

export const Player: React.ComponentType<any> = playerHOC(
  FacebookPlayer,
  mapPropsToPlayer,
  mapMethodsToPlayer,
);
