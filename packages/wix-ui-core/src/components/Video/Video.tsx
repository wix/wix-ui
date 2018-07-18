import * as React from 'react';
import {string, number, func, object, bool, array, node, oneOfType, oneOf, Requireable} from 'prop-types';
import {create, VIDEO_EVENTS, ENGINE_STATES} from 'playable';
import styles from './Video.st.css';

export interface VideoProps {
  id?: string;
  src?: string | Array<string>;
  width?: number | string;
  height?: number | string;
  title?: string;
  playButton?: React.ReactNode;
  fillAllSpace?: boolean;
  loop?: boolean;
  volume?: number;
  logoUrl?: string;
  onLogoClick?: Function;
  alwaysShowLogo?: boolean;
  controls?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  poster?: string;
  playing?: boolean;
  muted?: boolean;
  onPlay?: Function;
  onPause?: Function;
  onEnd?: Function;
  playableRef?: Function;
}

export interface VideoState {
  hasBeenPlayed: boolean;
}

const noop = () => null;

const mapPropsToMethods = {
  src: 'setSrc',
  width: 'setWidth',
  height: 'setHeight',
  title: 'setTitle',
  fillAllSpace: 'setFillAllSpace',
  loop: 'setLoop',
  logoUrl: 'setLogo',
  alwaysShowLogo: 'setLogoAlwaysShowFlag',
  onLogoClick: 'setLogoClickCallback',
  volume: 'setVolume',
  controls: (instance, player, isShow) => {
    // TODO: replace it after playable API update
    if (isShow) {
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
  preload: 'setPreload',
  playing: (instance, player, nextPlaying) => {
    if (!instance.props.playing && nextPlaying && !instance._isPlaying()) {
      player.play();
    }
    if (instance.props.playing && !nextPlaying && instance._isPlaying()) {
      player.pause();
    }
  },
  muted: (instance, player, nextMuted) => {
    if (!instance.props.muted && nextMuted && !player.getMute()) {
      player.setMute(true);
    }
    if (instance.props.muted && !nextMuted && player.getMute()) {
      player.setMute(false);
    }
  }
};

export class Video extends React.PureComponent<VideoProps, VideoState> {
  static displayName = 'Video';

  containerRef: HTMLDivElement;
  player: any;

  static propTypes = {
    /** Element ID */
    id: string,
    /** A string or array with source of the video. For more information see this [page](https://wix.github.io/playable/video-source) */
    src: oneOfType([
      string,
      array,
    ]),
    /** Width of video player */
    width: oneOfType([
      string,
      number,
    ]),
    /** Height of video player */
    height: oneOfType([
      string,
      number,
    ]),
    /** String that would be shown as title of video. */
    title: string,
    /** React Component to appear for the "Play" button on poster */
    playButton: node,
    /** Pass `true` to alow player fill all space of it container. */
    fillAllSpace: bool,
    /** Loop video playback. */
    loop: bool,
    /** Start value of volume for audio, `0..100`. */
    volume: number,
    /** URL to image that would be used as logo on video */
    logoUrl: string,
    /** Function that will be evaluated after click on logo */
    onLogoClick: func,
    /** Pass true to set the logo to be visible no matter what */
    alwaysShowLogo: bool,
    /** Pass false to hide controls */
    controls: bool,
    /** Type of preloading. For more info check [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) */
    preload: oneOf(['auto', 'metadata', 'none']),
    /** URL to image that would be used as poster on overlay */
    poster: string,
    /** Set to `true` or `false` to pause or play the media */
    playing: bool,
    /** Mutes the player */
    muted: bool,
    /** Called when media starts or resumes playing after pausing or buffering */
    onPlay: func,
    /** Called when media is paused */
    onPause: func,
    /** Called when media finishes playing */
    onEnd: func,
    /** Use `playableRef` to call instance methods on the [playable](https://wix.github.io/playable/api). */
    playableRef: func,
  };

  static defaultProps = {
    controls: true,
    onPlay: noop,
    onPause: noop,
    onEnd: noop,
    playableRef: noop,
  };

  state = {hasBeenPlayed: false};

  componentDidMount() {
    const {
      src, playing, muted, width, height, title, fillAllSpace, loop, volume, controls, preload,
      logoUrl, onLogoClick, alwaysShowLogo, playableRef, onPlay, onPause, onEnd
    } = this.props;
    let logo;

    if (logoUrl || onLogoClick || alwaysShowLogo) {
      logo = {
        src: logoUrl,
        callback: onLogoClick,
        showAlways: alwaysShowLogo,
      };
    }

    this.player = create({
      src,
      autoPlay: !!playing,
      muted,
      size: {
        width,
        height,
      },
      title: {
        text: title,
      },
      controls,
      preload,
      logo,
      fillAllSpace,
      loop,
      volume,
      overlay: false
    });

    playableRef(this.player);

    this.player.attachToElement(this.containerRef);

    this.player.on(VIDEO_EVENTS.PLAY_REQUEST_TRIGGERED, () => {
      this.setState({hasBeenPlayed: true});
    });

    this.player.on(ENGINE_STATES.PLAYING, () => {
      this.setState({hasBeenPlayed: true});
      onPlay();
    });

    this.player.on(ENGINE_STATES.PAUSED, () => {
      onPause();
    });

    this.player.on(ENGINE_STATES.ENDED, () => {
      this.setState({hasBeenPlayed: false});
      onEnd();
    });

    this.player.on(ENGINE_STATES.SRC_SET, () => {
      this.setState({hasBeenPlayed: false});
    });

    this.player.on(VIDEO_EVENTS.RESET, () => {
      this.setState({hasBeenPlayed: false});
    });
  }

  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;

    for (let propKey in nextProps) {
      const method = mapPropsToMethods[propKey];
      const isPropChanged = nextProps[propKey] !== currentProps[propKey];

      if (method && isPropChanged) {
        if (typeof method === 'string') {
          this.player[method](nextProps[propKey]);
        } else {
          method(this, this.player, nextProps[propKey]);
        }
      }
    }
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  _isPlaying(): boolean {
    return this.player.getCurrentPlaybackState() === ENGINE_STATES.PLAYING;
  }

  _play = (): void => {
    this.player.play();
  }

  render() {
    const {id, title, poster, playButton} = this.props;
    const coverStyles = {
      backgroundImage: poster ? `url(${poster})` : 'none'
    };
    let {width, height} = this.props;

    if (this.props.fillAllSpace) {
      width = '100%';
      height = '100%';
    }

    return (
      <div
        id={id}
        style={{width, height}}
        {...styles('root', {}, this.props)}
      >
        <div 
          ref={el => this.containerRef = el}
          style={{width, height}} 
          className={styles.playerContainer}
        />
        {!this.state.hasBeenPlayed && poster && (
          <div
            className={styles.cover}
            style={coverStyles}
            onClick={this._play}
            data-hook="cover"
          >
            <div className={styles.overlay}>
              {title && <div data-hook="title" title={title} className={styles.title}>{title}</div>}
              {playButton}
            </div>
          </div>
        )}
      </div>
    );
  }
}
