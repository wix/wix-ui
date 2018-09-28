import * as React from 'react';
import {string, number, func, bool, oneOfType} from 'prop-types';
import ReactPlayer from 'react-player';

import styles from './SocialPlayer.st.css';

export interface SocialPlayerProps {
  id?: string;
  width?: number | string;
  height?: number | string;
  src?: string;
  playing?: boolean;
  loop?: boolean;
  volume?: number;
  muted?: boolean;
  controls?: boolean;
  showTitle?: boolean;
  onPlay?(): void;
  onPause?(): void;
  onEnd?(): void;
  playerRef?(any): void;
}

/**
 * SocialPlayer
 */
export const SocialPlayer: React.SFC<SocialPlayerProps> = props => {
  const {
    id, width, height,
    src, loop, volume, muted, playing, controls,
    onPlay, onPause, onEnd,
    playerRef
  } = props;

  return (
    <div
      id={id}
      style={{width, height}}
      {...styles('root', {}, props)}
    >
      <ReactPlayer
        ref={playerRef}
        className={styles.playerContainer}
        width='100%'
        height='100%'
        url={src}
        playing={playing}
        loop={loop}
        volume={volume}
        muted={muted}
        playsinline
        controls={controls}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnd}
      />
    </div>
  );
};

SocialPlayer.displayName = 'SocialPlayer';

SocialPlayer.propTypes = {
  /** Element ID */
  id: string,
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
  /** A string or array with source of the video. For more information see this [page](https://wix.github.io/playable/video-source) */
  src: string,
  /** Set to `true` or `false` to pause or play the media */
  playing: bool,
  /** Loop video playback. */
  loop: bool,
  /** Start value of volume for audio, `0..100`. */
  volume: number,
  /** Pass false to hide controls */
  controls: bool,
  /** Pass false to hide title */
  showTitle: bool,
  /** Mutes the player */
  muted: bool,
  /** Called when media starts or resumes playing after pausing or buffering */
  onPlay: func,
  /** Called when media is paused */
  onPause: func,
  /** Called when media finishes playing */
  onEnd: func,
  /** Use `playerRef` to call instance methods */
  playerRef: func
};

const noop = () => null;

SocialPlayer.defaultProps = {
  controls: false,
  loop: false,
  muted: false,
  onPlay: noop,
  onPause: noop,
  onEnd: noop,
  playerRef: noop,
};
