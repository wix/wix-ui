import * as React from 'react';
import uniqueId = require('lodash/uniqueId');
import isString = require('lodash/isString');
import isFunction = require('lodash/isFunction');
import {EVENTS} from '../constants';
import {
  IPlayerAPI,
  IEventEmitter,
  IPropsToPlayer,
  IMethodsToPlayer,
  ICommonProps
} from '../types';

interface IPlayerRef {
  player: IPlayerAPI;
  eventEmitter: IEventEmitter;
}

interface IState {
  playerKey: string;
}

export default function playerHOC(
  Player: React.ComponentType<any>,
  mapPropsToPlayer: IPropsToPlayer,
  mapMethodsToPlayer: IMethodsToPlayer
): React.ComponentType<any> {

  return class extends React.Component<ICommonProps> {
    static propTypes = Player.propTypes;
    static displayName = Player.displayName;

    ref: IPlayerRef;
    isPlayingNow: boolean = false;
    state: IState = {
      playerKey: uniqueId('player-'),
    };

    componentDidMount() {
      const { onPlay, onPause, onEnded, onFirstPlay, onFirstEnded } = this.props;

      this.ref.eventEmitter.once(EVENTS.PLAYING, () => {
        onFirstPlay();
      });
      this.ref.eventEmitter.once(EVENTS.ENDED, () => {
        onFirstEnded();
      });
      this.ref.eventEmitter.on(EVENTS.PLAYING, () => {
        this.isPlayingNow = true;
        onPlay();
      });
      this.ref.eventEmitter.on(EVENTS.PAUSED, () => {
        this.isPlayingNow = false;
        onPause();
      });
      this.ref.eventEmitter.on(EVENTS.ENDED, () => {
        this.isPlayingNow = false;
        onEnded();
      });
    }

    componentWillReceiveProps(nextProps: ICommonProps) {
      const currentProps = this.props;

      for (let propKey in nextProps) {
        const method = mapPropsToPlayer[propKey];
        const isPropChanged = nextProps[propKey] !== currentProps[propKey];

        if (method && isPropChanged) {
          this._callPlayer(method, nextProps[propKey]);
        }
      }
    }

    private _callPlayer(method: string | Function, ...args): any {
      const player: IPlayerAPI = this.ref.player;

      try {
        if (isString(method)) {
          return player[method](...args)
        } else if (isFunction(method)) {
          return method(this, player, ...args);
        }
      } catch(error) {
        this.props.onError(error);
      }
    };

    private _playerRef = (instance: IPlayerRef): void => {
      this.ref = instance;
    }

    public reload(): void {
      this.setState({
        playerKey: uniqueId('player-'),
      });
    }

    public getPlayerAPI(): IPlayerAPI {
      return this.ref.player;
    }

    public play(): Promise<void> {
      const result = this._callPlayer(mapMethodsToPlayer.play);

      return (result instanceof Promise) ? result : new Promise(resolve => {
        this.ref.eventEmitter.once(EVENTS.PLAYING, () => resolve());
      });
    }

    public pause(): Promise<void> {
      const result = this._callPlayer(mapMethodsToPlayer.pause);

      return (result instanceof Promise) ? result : new Promise(resolve => {
        this.ref.eventEmitter.once(EVENTS.PAUSED, () => resolve());
      });
    }

    public togglePlay(): Promise<void> {
      const method = this.isPlayingNow ? 'pause' : 'play';
      const event = this.isPlayingNow ? EVENTS.PAUSED : EVENTS.PLAYING;
      const result = this._callPlayer(mapMethodsToPlayer[method]);

      return (result instanceof Promise) ? result : new Promise(resolve => {
        this.ref.eventEmitter.once(event, () => resolve());
      });
    }

    public stop(): Promise<void> {
      this._callPlayer(mapMethodsToPlayer.stop);

      return Promise.resolve();
    }

    public getDuration(): string | number {
      return this._callPlayer(mapMethodsToPlayer.getDuration) || 0;
    }

    public getCurrentTime(): string | number {
      return this._callPlayer(mapMethodsToPlayer.getCurrentTime) || 0;
    }

    public seekTo(amount: number): Promise<any> {
      this._callPlayer(mapMethodsToPlayer.seekTo, amount);

      return Promise.resolve();
    }

    public getVolume(): string | number {
      return this._callPlayer(mapMethodsToPlayer.getVolume) || 0;
    }

    public setVolume(fraction: number): void {
      return this._callPlayer(mapMethodsToPlayer.setVolume, fraction);
    }

    public isMuted(): boolean {
      return this._callPlayer(mapMethodsToPlayer.isMuted);
    }

    public isPlaying(): boolean {
      return this.isPlayingNow;
    }

    public mute(): Promise<void> {
      this._callPlayer(mapMethodsToPlayer.mute);

      return Promise.resolve();
    }

    public unMute(): Promise<void> {
      this._callPlayer(mapMethodsToPlayer.unMute);

      return Promise.resolve();
    }

    render() {
      return <Player key={this.state.playerKey} ref={this._playerRef} {...this.props} />;
    }
  }

}
