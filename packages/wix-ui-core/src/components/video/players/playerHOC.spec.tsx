import * as React from 'react';
import {EventEmitter} from 'eventemitter3';
import * as eventually from 'wix-eventually';
import { ReactDOMTestContainer } from '../../../../test/dom-test-container';
import playerHOC from './playerHOC';
import {IEventEmitter, IMethodsToPlayer, IPropsToPlayer} from '../types';
import {EVENTS} from '../constants';

const mapPropsToPlayer: IPropsToPlayer = {
  src: instance => instance.reload(),
  playing: (instance, player, nextPlaying) => {
    if (nextPlaying) {
      player.play();
    } else {
      player.pause();
    }
  },
  muted: 'setMute',
  volume: 'setVolume',
  loop: 'setLoop',
};

const mapMethodsToPlayer: IMethodsToPlayer = {
  play: 'videoPlay',
  pause: 'videoPause',
  stop: 'videoStop',
  getDuration: 'getDuration',
  getCurrentTime: 'getCurrentTime',
  seekTo: 'seekTo',
  getVolume: 'getVolume',
  setVolume: 'setVolume',
  isMuted: 'isMuted',
  mute: 'mute',
  unMute: 'unMute',
};

const mockAPI = {
  videoPlay: jest.fn(),
  videoPause: jest.fn(),
  videoStop: jest.fn(),
  getDuration: jest.fn(),
  getCurrentTime: jest.fn(),
  seekTo: jest.fn(),
  getVolume: jest.fn(),
  setVolume: jest.fn(),
  isMuted: jest.fn(),
  mute: jest.fn(),
  unMute: jest.fn(),
  destroy: jest.fn(),
};

const noop = () => null;

class MockPlayer extends React.PureComponent<any> {
  static defaultProps = {
    onInit: noop,
    onReady: noop
  };
  player: any;
  eventEmitter: IEventEmitter;

  constructor(props: any) {
    super(props);
    this.eventEmitter = new EventEmitter();
  }

  componentDidMount() {
    this.player = {
      ...mockAPI,
      mockPlay: () => {
        this.eventEmitter.emit(EVENTS.PLAYING);
      },
      mockPause: () => {
        this.eventEmitter.emit(EVENTS.PAUSED);
      },
      mockEnded: () => {
        this.eventEmitter.emit(EVENTS.ENDED);
      }
    };

    this.props.onInit(this.player);
    this.props.onReady();
  }
  
  componentWillUnmount () {
    this.player.destroy();
    this.eventEmitter.removeAllListeners();
  }

  render() {
    return (
      <div />
    )
  }
};

describe('playerHOC', () => {
  const container = new ReactDOMTestContainer().unmountAfterEachTest();
  const onReady = jest.fn();
  const onInit = jest.fn();

  describe('callbacks', () => {
    const Player = playerHOC(MockPlayer, mapPropsToPlayer, mapMethodsToPlayer);

    it('should call onInit with API when player is inited', async () => {
      let playerRef;

      await container.render(
        <Player
          onInit={onInit}
          ref={r => playerRef = r}
        />
      );

      await eventually(() => {
        const playerAPI = playerRef.getPlayerAPI();
        expect(onInit).toHaveBeenCalledWith(playerAPI)
      });
    });

    it('should call onReady when Player API is ready', async () => {
      await container.render(<Player onReady={onReady} />);

      await eventually(() => {
        expect(onReady).toHaveBeenCalled()
      });
    });

    it('should callonFirstPlay once and onPlay when playing', async () => {
      const onPlay = jest.fn();
      const onFirstPlay = jest.fn();
      let playerRef;

      await container.render(
        <Player
          ref={r => playerRef = r}
          onReady={onReady}
          onFirstPlay={onFirstPlay}
          onPlay={onPlay}
        />);
      await eventually(() => {
        expect(onReady).toHaveBeenCalled()
      });

      const playerAPI = playerRef.getPlayerAPI();
      playerAPI.mockPlay();
      playerAPI.mockPlay();

      await eventually(() => {
        expect(onPlay).toHaveBeenCalledTimes(2);
        expect(onFirstPlay).toHaveBeenCalledTimes(1);
      });
    });

    it('should call onPause when pause', async () => {
      const onPause = jest.fn();
      let playerRef;

      await container.render(
        <Player
          ref={r => playerRef = r}
          onReady={onReady}
          onPause={onPause}
        />);
      await eventually(() => {
        expect(onReady).toHaveBeenCalled()
      });

      const playerAPI = playerRef.getPlayerAPI();
      playerAPI.mockPause();

      await eventually(() => {
        expect(onPause).toHaveBeenCalled();
      });
    });

    it('should call onFirstEnded once and onEnded  when ended', async () => {
      const onEnded = jest.fn();
      const onFirstEnded = jest.fn();
      let playerRef;

      await container.render(
        <Player
          ref={r => playerRef = r}
          onReady={onReady}
          onFirstEnded={onFirstEnded}
          onEnded={onEnded}
        />);
      await eventually(() => {
        expect(onReady).toHaveBeenCalled()
      });

      const playerAPI = playerRef.getPlayerAPI();
      playerAPI.mockEnded();
      playerAPI.mockEnded();

      await eventually(() => {
        expect(onEnded).toHaveBeenCalledTimes(2);
        expect(onFirstEnded).toHaveBeenCalledTimes(1);
      });
    });

    it('should reload', async () => {
      let playerRef;

      await container.render(
        <Player
          ref={r => playerRef = r}
          onReady={onReady}
        />);
      await eventually(() => {
        expect(onReady).toHaveBeenCalled()
      });

      playerRef.reload();

      await eventually(() => {
        expect(mockAPI.destroy).toHaveBeenCalled();
        expect(onReady).toHaveBeenCalled()
      });
    });
  });

  describe('methods', () => {
    const Player = playerHOC(MockPlayer, mapPropsToPlayer, mapMethodsToPlayer);

    [
      ['play', 'videoPlay'],
      ['pause', 'videoPause'],
      ['stop', 'videoStop']
    ].map(([method, playerMethod]) =>
      it(`should call \`${playerMethod}\` when \`${method}\` is triggered`, async () => {
        let playerRef: any;

        await container.render(
          <Player
            ref={r => playerRef = r}
            onReady={onReady}
          />);
        await eventually(() => {
          expect(onReady).toHaveBeenCalled()
        });

        playerRef[method]();

        await eventually(() => {
          expect(mockAPI[playerMethod]).toHaveBeenCalled();
        });
      })
    );
  });
});