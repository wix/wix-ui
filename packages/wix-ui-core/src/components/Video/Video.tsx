import * as React from 'react';
import {string, number, func, bool, Requireable} from 'prop-types';
import {create, VIDEO_EVENTS, ENGINE_STATES} from 'playable';

export interface VideoProps {
  src?: string;
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

export interface VideoState {}

const noop = () => null;

const mapPropsToMethods = {
  src: 'setSrc',
  width: 'setWidth',
  height: 'setHeight',
  title: 'setTitle',
  poster: 'setPoster',
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
    /** A string or array with source of the video. For more information see this [page](https://wix.github.io/playable/video-source) */
    src: string,
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
      overlay: {
        poster: props.poster,
      },
    });
    props.playableRef(this.player);
  }

  _isPlaying() {
    return this.player.getCurrentPlaybackState() === ENGINE_STATES.PLAYING;
  }

  componentDidMount() {
    this.player.attachToElement(this.containerRef);

    this.player.on(VIDEO_EVENTS.STATE_CHANGED, ({nextState}) => {
      if (nextState === ENGINE_STATES.PLAYING) {
        this.props.onPlay();
      }
      if (nextState === ENGINE_STATES.PAUSED) {
        this.props.onPause();
      }
      if (nextState === ENGINE_STATES.ENDED) {
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

  render() {
    return (
      <div ref={el => this.containerRef = el}></div>
    );
  }
}
