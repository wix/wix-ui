import * as React from 'react';
import { playerComponents, playerVerifiers } from './players';
import { PlayerNameType, ICommonProps, IConfig } from './types';
import { style, classes } from './Video.st.css';

const noop = () => null;
const DEFAULT_PLAYER = 'playable';

const getPlayerName = (url: string | string[]): PlayerNameType => {
  for (const key in playerVerifiers) {
    const name = key as PlayerNameType;

    if (playerVerifiers[name](url)) {
      return name;
    }
  }

  return DEFAULT_PLAYER;
};

export interface IVideoProps extends ICommonProps {
  config?: IConfig;
  playerRef?: Function;
  fillAllSpace?: boolean;
  width?: number | string;
  height?: number | string;
}

export interface IVideoState {
  playerName: PlayerNameType;
}

export class Video extends React.Component<IVideoProps, IVideoState> {
  static displayName = 'Video';
  static defaultProps = {
    controls: true,
    loop: false,
    muted: false,
    showTitle: true,
    fillAllSpace: false,
    volume: 100,
    onInit: noop,
    onReady: noop,
    onDuration: noop,
    onPlay: noop,
    onPause: noop,
    onEnded: noop,
    onProgress: noop,
    onError: noop,
    onFirstPlay: noop,
    onFirstEnded: noop,
    config: {},
  };

  state: IVideoState = {
    playerName: null,
  };

  constructor(props: IVideoProps) {
    super(props);

    this.state.playerName = getPlayerName(this.props.src);
  }

  UNSAFE_componentWillReceiveProps(nextProps: IVideoProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        playerName: getPlayerName(nextProps.src),
      });
    }
  }

  render() {
    const { playerName } = this.state;

    if (!playerName) {
      return null;
    }

    const Player = playerComponents[playerName];
    const playerProps = { ...this.props, ...this.props.config[playerName] };
    const { id, fillAllSpace, playerRef } = this.props;
    let { width, height } = this.props;

    if (fillAllSpace) {
      width = '100%';
      height = '100%';
    }

    return (
      <div id={id} style={{ width, height }} className={style(classes.root)}>
        <Player {...playerProps} ref={playerRef} />
      </div>
    );
  }
}
