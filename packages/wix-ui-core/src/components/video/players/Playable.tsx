import * as React from 'react';
import {EventEmitter} from 'eventemitter3';
import isString = require('lodash/isString');
import isArray = require('lodash/isArray');
import {create, registerModule, VIDEO_EVENTS, ENGINE_STATES} from 'playable';
import {EVENTS} from '../constants';
import playerHOC from './playerHOC';
import {
  ICommonProps,
  IEventEmitter,
  IPropsToPlayer,
  IMethodsToPlayer,
  VerifierType,
  IPlayablePlayerAPI,
  IPlayableConfig,
} from '../types';
import styles from '../Video.st.css';

const URL_REGEX = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i;

export const verifier: VerifierType = url => {
  if (isString(url)) {
    return URL_REGEX.test(url);
  } else if (isArray(url)) {
    return url.some(item => URL_REGEX.test(item));
  }

  return false;
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
  volume: 'setVolume',
  title: 'setTitle',
  loop: 'setLoop',
  logoUrl: 'setLogo',
  alwaysShowLogo: 'setAlwaysShowLogo',
  onLogoClick: 'setLogoClickCallback',
  preload: 'setPreload',
  showTitle: (instance, player, isShowTitle) => {
    if (isShowTitle) {
      player.showTitle();
    } else {
      player.hideTitle();
    }
  },
  controls: (instance, player, isShowControls) => {
    if (isShowControls) {
      player.showPlayControl();
      player.showVolumeControl();
      player.showTimeControl();
      player.showFullScreenControl();
      player.showProgressControl();
    } else {
      player.hidePlayControl();
      player.hideVolumeControl();
      player.hideTimeControl();
      player.hideFullScreenControl();
      player.hideProgressControl();
    }
  },
};

const mapMethodsToPlayer: IMethodsToPlayer = {
  play: 'play',
  pause: 'pause',
  stop: 'reset',
  getDuration: 'getDuration',
  getCurrentTime: 'getCurrentTime',
  seekTo: 'seekTo',
  getVolume: 'getVolume',
  setVolume: 'setVolume',
  isMuted: (instance, player) => player.isMuted,
  mute: 'mute',
  unMute: 'unmute',
};

interface IPlayableProps extends ICommonProps, IPlayableConfig {}

interface IPlayableState {
  hasBeenPlayed: boolean;
}

class PlayablePlayer extends React.PureComponent<IPlayableProps, IPlayableState> {
  static displayName = 'Playable';
  static defaultProps = {
    poster: '',
    playButton: null,
  };

  state: IPlayableState = {
    hasBeenPlayed: false
  };
  player: IPlayablePlayerAPI;
  eventEmitter: IEventEmitter;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: IPlayableProps) {
    super(props);

    this.containerRef = React.createRef();
    this.eventEmitter = new EventEmitter();
  }

  componentDidMount() {
    this.initPlayer();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy();
    }
    this.eventEmitter.removeAllListeners();
  }

  initPlayer() {
    const {
      src, playing, muted, title, showTitle, loop, volume, controls, preload,
      onInit, onReady, onDuration, onProgress,
      logoUrl, onLogoClick, alwaysShowLogo, modules,
    } = this.props;

    this.registerModules(modules);

    this.player = create({
      src,
      autoplay: !!playing,
      playsinline: true,
      muted,
      width: '100%',
      height: '100%',
      fillAllSpace: true,
      title,
      preload,
      loop,
      volume,
      hideOverlay: true,
    });

    if (!controls) {
      this.player.hidePlayControl();
      this.player.hideVolumeControl();
      this.player.hideTimeControl();
      this.player.hideFullScreenControl();
      this.player.hideProgressControl();
    }

    if (!showTitle) {
      this.player.hideTitle();
    }

    if (logoUrl || onLogoClick || alwaysShowLogo) {
      this.player.setLogo(logoUrl);
      this.player.setAlwaysShowLogo(alwaysShowLogo);
      this.player.setLogoClickCallback(onLogoClick);
    }

    this.player.attachToElement(this.containerRef.current);

    this.player.on(VIDEO_EVENTS.PLAY_REQUEST, () => {
      this.setState({hasBeenPlayed: true});
    });

    this.player.on(ENGINE_STATES.METADATA_LOADED, () => {
      onReady();
      onDuration(this.player.getDuration());
    });

    this.player.on(ENGINE_STATES.PLAYING, () => {
      this.setState({hasBeenPlayed: true});
      this.eventEmitter.emit(EVENTS.PLAYING);
    });

    this.player.on(ENGINE_STATES.PAUSED, () => {
      this.eventEmitter.emit(EVENTS.PAUSED);
    });

    this.player.on(ENGINE_STATES.ENDED, () => {
      this.setState({hasBeenPlayed: false});
      this.eventEmitter.emit(EVENTS.ENDED);
    });

    this.player.on(VIDEO_EVENTS.CURRENT_TIME_UPDATED, currentTime => {
      onProgress(currentTime);
    });

    onInit(this.player);
  }

  registerModules(modules: any = {}) {
    Object.keys(modules).forEach(moduleName =>
      registerModule(moduleName, modules[moduleName]),
    );
  }

  onPlayClick = (): void => {
    this.player.play();
  }

  render() {
    const {showTitle, title, poster, playButton} = this.props;
    const coverStyles = {backgroundImage: poster ? `url(${poster})` : 'none'};

    return (
      <React.Fragment>
        <div 
          ref={this.containerRef}
          className={styles.playerContainer}
          data-player-name="Playable"
        />
        {!this.state.hasBeenPlayed && poster && (
          <div
            className={styles.cover}
            style={coverStyles}
            onClick={this.onPlayClick}
            data-hook="cover"
          >
            <div className={styles.overlay}>
              {showTitle && title && <div data-hook="title" title={title} className={styles.title}>{title}</div>}
              {playButton}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export const Player: React.ComponentType<any> = playerHOC(PlayablePlayer, mapPropsToPlayer, mapMethodsToPlayer);
