import * as React from 'react';
import {string, number, func, object, bool, array, oneOfType, Requireable} from 'prop-types';
import {create, VIDEO_EVENTS, ENGINE_STATES} from 'playable';
import styles from './Video.st.css';
import {playButtonIcon} from './playButtonIcon';

export interface VideoProps {
  id?: string;
  src?: string | Array<string>;
  width?: number;
  height?: number;
  title?: string;
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

  containerRef: HTMLDivElement;
  player: any;

  static propTypes = {
    id: string,
    /** A string or array with source of the video. For more information see this [page](https://wix.github.io/playable/video-source) */
    src: oneOfType([
      string,
      array,
    ]),
    /** Width of video player */
    width: number,
    /** Height of video player */
    height: number,
    /** String that would be shown as title of video. */
    title: string,
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
    onPlay: noop,
    onPause: noop,
    onEnd: noop,
    playableRef: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasBeenPlayed: false,
    };

    this.player = create({
      src: props.src,
      autoPlay: !!props.playing,
      muted: props.muted,
      size: {
        width: props.width,
        height: props.height,
      },
      title: {
        text: props.title
      },
      overlay: false,
    });
    props.playableRef(this.player);
  }

  componentDidMount() {
    this.player.attachToElement(this.containerRef);

    this.player.on(VIDEO_EVENTS.STATE_CHANGED, ({nextState}) => {
      if (nextState === ENGINE_STATES.PLAYING) {
        this.setState({hasBeenPlayed: true});
        this.props.onPlay();
      }
      if (nextState === ENGINE_STATES.PAUSED) {
        this.props.onPause();
      }
      if (nextState === ENGINE_STATES.ENDED) {
        this.setState({hasBeenPlayed: false});
        this.props.onEnd();
      }
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
    this.player.off(VIDEO_EVENTS.STATE_CHANGED);
    this.player.destroy();
  }

  _isPlaying() {
    return this.player.getCurrentPlaybackState() === ENGINE_STATES.PLAYING;
  }

  _play = (): void => {
    this.player.play();
  }

  render() {
    const {id, title, poster} = this.props;
    const coverStyles = {
      backgroundImage: poster ? `url(${poster})` : 'none'
    };

    return (
      <div
        ref={el => this.containerRef = el}
        id={id}
        {...styles('root', {}, this.props)}>
        {!this.state.hasBeenPlayed && <div className={styles.cover} style={coverStyles} onClick={this._play}>
          <div className={styles.overlay}>
            {title && <div title={title} className={styles.title}>{title}</div>}
            <button type="button" className={styles.playButton}>{playButtonIcon}</button>
          </div>
        </div>}
      </div>
    );
  }
}
