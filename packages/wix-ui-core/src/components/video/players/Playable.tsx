import * as React from 'react';
import { EventEmitter } from 'eventemitter3';
import classNames from 'classnames';
const isString = require('lodash/isString');
const isArray = require('lodash/isArray');
import { create, registerModule, VIDEO_EVENTS, ENGINE_STATES } from 'playable';
import { EVENTS } from '../constants';
import playerHOC from './playerHOC';
import {
  ICommonProps,
  IEventEmitter,
  IPropsToPlayer,
  IMethodsToPlayer,
  VerifierType,
  IPlayablePlayerAPI,
  IPlayableConfig,
  PlayerNameType,
} from '../types';
import { classes } from '../Video.st.css';
import { PreloadType } from 'playable/dist/statics/modules/playback-engine/types';

const URL_REGEX = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i;

export const verifier: VerifierType = url => {
  if (isString(url)) {
    return URL_REGEX.test(url as string);
  }
  if (isArray(url)) {
    return (url as string[]).some(item => URL_REGEX.test(item));
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

class PlayablePlayer extends React.PureComponent<
  IPlayableProps,
  IPlayableState
> {
  static displayName = 'Playable';
  static playerName: PlayerNameType = 'playable';
  static defaultProps = {
    poster: '',
    playButton: null,
  };

  state: IPlayableState = {
    hasBeenPlayed: false,
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
      this.player
        .getElement()
        .removeEventListener('contextmenu', this._handleRightClick);
      this.player.destroy();
    }
    this.eventEmitter.removeAllListeners();
  }

  initPlayer() {
    const {
      src,
      playing,
      poster,
      muted,
      title,
      texts,
      showTitle,
      loop,
      volume,
      controls,
      onInit,
      onReady,
      onDuration,
      onProgress,
      logoUrl,
      onLogoClick,
      alwaysShowLogo,
      modules,
      hideMainUI,
    } = this.props;

    const preload = (!poster ? 'metadata' : this.props.preload) as PreloadType;

    this.registerModules(modules);

    this.player = create({
      src,
      autoplay: !!playing,
      playsinline: true,
      muted,
      fillAllSpace: true,
      title,
      preload,
      loop,
      volume,
      texts,
      hideOverlay: true,
      hideMainUI,
    });

    this.player
      .getElement()
      .addEventListener('contextmenu', this._handleRightClick);
    this._hidePlayableUI();

    if (!showTitle) {
      this.player.hideTitle();
    }

    if (logoUrl || onLogoClick || alwaysShowLogo) {
      this.player.setLogo(logoUrl);
      this.player.setAlwaysShowLogo(alwaysShowLogo);
      this.player.setLogoClickCallback(onLogoClick);
    }

    this.player.attachToElement(this.containerRef.current);

    this.player.on(ENGINE_STATES.PLAY_REQUESTED, () => {
      if (controls) {
        this._showPlayableUI();
      }
      this.setState({ hasBeenPlayed: true });
    });

    this.player.on(ENGINE_STATES.METADATA_LOADED, () => {
      onReady();
      onDuration(this.player.getDuration());
    });

    this.player.on(ENGINE_STATES.PLAYING, () => {
      this.setState({ hasBeenPlayed: true });
      this.eventEmitter.emit(EVENTS.PLAYING);
    });

    this.player.on(ENGINE_STATES.PAUSED, () => {
      this.eventEmitter.emit(EVENTS.PAUSED);
    });

    this.player.on(ENGINE_STATES.ENDED, () => {
      this.setState({ hasBeenPlayed: false });
      this.eventEmitter.emit(EVENTS.ENDED);
    });

    this.player.on(VIDEO_EVENTS.CURRENT_TIME_UPDATED, currentTime => {
      onProgress(currentTime);
    });

    onInit(this.player, PlayablePlayer.playerName);
  }

  _showPlayableUI() {
    this.player.showPlayControl();
    this.player.showVolumeControl();
    this.player.showTimeControl();
    this.player.showFullScreenControl();
    this.player.showProgressControl();
    this.player.showPictureInPictureControl();
  }

  _hidePlayableUI() {
    this.player.hidePlayControl();
    this.player.hideVolumeControl();
    this.player.hideTimeControl();
    this.player.hideFullScreenControl();
    this.player.hideProgressControl();
    this.player.hidePictureInPictureControl();
  }

  _renderCover() {
    const {
      showTitle,
      title,
      poster,
      hideOverlay,
      playButton,
      playing,
      description,
    } = this.props;
    const { hasBeenPlayed } = this.state;
    if (hideOverlay || playing || hasBeenPlayed) {
      return null;
    }
    return (
      <div
        className={classNames(classes.cover, {
          [classes.transparentOverlay]: !poster,
        })}
        onClick={this.onPlayClick}
        onContextMenu={this._handleRightClick}
        data-hook="cover"
      >
        {poster && (
          <img src={poster} alt={description} className={classes.poster} />
        )}
        <div className={classes.overlay}>
          {showTitle && title && (
            <div data-hook="title" title={title} className={classes.title}>
              {title}
            </div>
          )}
          {playButton}
        </div>
      </div>
    );
  }

  registerModules(modules: any = {}) {
    Object.keys(modules).forEach(moduleName =>
      registerModule(moduleName, modules[moduleName]),
    );
  }

  onPlayClick = (): void => {
    this.player.play();
  };

  _handleRightClick = event => event.preventDefault();

  render() {
    return (
      <React.Fragment>
        <div
          ref={this.containerRef}
          className={classes.playerContainer}
          data-player-name="Playable"
        />
        {this._renderCover()}
      </React.Fragment>
    );
  }
}

export const Player: React.ComponentType<any> = playerHOC(
  PlayablePlayer,
  mapPropsToPlayer,
  mapMethodsToPlayer,
);
