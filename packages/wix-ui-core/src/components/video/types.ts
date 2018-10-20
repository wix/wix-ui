import * as React from 'react';

export type PlayerNamesType = 'dailymotion' | 'facebook' | 'playable' | 'twitch' | 'vimeo' | 'youtube'

export type VerifierType = (url: string | Array<string>) => boolean;

export interface ICommonProps {
  src: string | Array<string>;
  loop?: boolean;
  volume?: number;
  controls?: boolean;
  playing?: boolean;
  muted?: boolean;
  showTitle?: boolean;
  onReady?: Function;
  onDuration?: Function;
  onProgress?: Function;
  onPlay?: Function;
  onPause?: Function;
  onEnded?: Function;
  onFirstPlay?: Function;
  onFirstEnded?: Function;
  onError?: Function;
}

export interface IDailyMotionConfig {
  playerOptions?: {};
}

export interface IFacebookConfig {
  appId?: string;
}

export interface IPlayableConfig {
  preload?: 'auto' | 'metadata' | 'none';
  title?: string;
  playButton?: React.ReactNode;
  logoUrl?: string;
  onLogoClick?: Function;
  alwaysShowLogo?: boolean;
  poster?: string;
}

export interface ITwitchConfig {
  playerOptions?: {};
}

export interface IVimeoConfig {
  playerOptions?: {};
}

export interface IYouTubeMotionConfig {
  playerOptions?: {};
}

export interface IConfig {
  dailymotion?: IDailyMotionConfig;
  facebook?: IFacebookConfig;
  playable?: IPlayableConfig;
  twitch?: ITwitchConfig;
  vimeo?: IVimeoConfig;
  youtube?: IYouTubeMotionConfig;
}

export interface ISDKConfig {
  name: string;
  url: string;
  isLoaded?(sdk: any): boolean;
  onReady?: string;
  isRequireAllow?: boolean;
  resolveRequire?(sdk: any): any;
}

export interface IEventEmitter {
  on(event: string, fn: Function, context?: any): this;
  once(event: string, fn: Function, context?: any): this;
  off(event: string, fn?: Function, context?: any, once?: boolean): this;
  emit(event: string, ...args: Array<any>): boolean;
  removeAllListeners(event?: string): this;
}

export interface IPropsToPlayer {
  src: string | Function;
  playing: string | Function;
  muted?: string | Function;
  volume?: string | Function;
  loop?: string | Function;
  controls?: string | Function;
  title?: string | Function;
  logoUrl?: string | Function;
  alwaysShowLogo?: string | Function;
  onLogoClick?: string | Function;
  preload?: string | Function;
  showTitle?: string | Function;
}

export interface IMethodsToPlayer {
  play: string | Function;
  pause: string | Function;
  stop?: string | Function;
  getDuration: string | Function;
  getCurrentTime: string | Function;
  seekTo: string | Function;
  getVolume: string | Function;
  setVolume: string | Function;
  isMuted: string | Function;
  mute: string | Function;
  unMute: string | Function;
}


// PLAYER API
export interface IDailyMotionPlayerAPI {
  play(): void;
  pause(): void;
  setCurrentTime(amount: number): void;
  setVolume(fraction: number): void;
  setMuted(muted: boolean): void;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
}

export interface IFacebookPlayerAPI {
  play(): void;
  pause(): void;
  seek(amount: number): void;
  setVolume(fraction: number): void;
  getCurrentPosition(): number;
  getDuration(): number;
  mute(): void;
  unmute(): void;
  isMuted(): boolean;
  subscribe(event: string, fn?: Function): void;
}

export interface IPlayablePlayerAPI {
  play(): void;
  pause(): void;
  reset(): void;
  seekTo(amount: number): void;
  setVolume(fraction: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  mute(): void;
  unmute(): void;
  isMuted: boolean;
  setLogo(url: string): void;
  setAlwaysShowLogo(show: boolean): void;
  setLogoClickCallback(cb: Function): void;
  showPlayControl(): void;
  showVolumeControl(): void;
  showTimeControl(): void;
  showFullScreenControl(): void;
  showProgressControl(): void;
  showTitle(): void;
  hidePlayControl(): void;
  hideVolumeControl(): void;
  hideTimeControl(): void;
  hideFullScreenControl(): void;
  hideProgressControl(): void;
  hideTitle(): void;
  destroy(): void;
  on(event: string, fn?: Function): void;
  attachToElement(el: HTMLDivElement): void;
}

export interface ITwitchPlayerAPI {
  play(): void;
  pause(): void;
  setCurrentTime(amount: number): void;
  setVolume(fraction: number): void;
  setMuted(muted: boolean): void;
  getMuted(): boolean;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
  addEventListener(event: string, fn?: Function): void;
}

export interface IVimeoPlayerAPI {
  play(): void;
  pause(): void;
  unload(): void;
  setCurrentTime(amount: number): void;
  setVolume(fraction: number): void;
  getCurrentTime(): Promise<any>;
  getDuration(): Promise<any>;
  destroy(): void;
  ready(): Promise<any>;
  on(event: string, fn?: Function): void;
}

export interface IYoutubePlayerAPI {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(amount: number): void;
  setVolume(fraction: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  destroy(): void;
  on(event: string, fn?: Function): void;
}


export type IPlayerAPI = IDailyMotionPlayerAPI | IFacebookPlayerAPI | IPlayablePlayerAPI | ITwitchPlayerAPI | IVimeoPlayerAPI | IYoutubePlayerAPI;

