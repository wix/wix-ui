import * as React from 'react';
import { Player as PlayablePlayer, verifier as PlayableVerifier } from './Playable'
import { Player as YouTubePlayer, verifier as YouTubeVerifier } from './YouTube'
import { Player as FacebookPlayer, verifier as FacebookVerifier } from './Facebook'
import { Player as VimeoPlayer, verifier as VimeoVerifier } from './Vimeo'
import { Player as TwitchPlayer, verifier as TwitchVerifier } from './Twitch'
import { Player as DailyMotionPlayer, verifier as DailyMotionVerifier } from './DailyMotion'

// @TODO enum ?
export const playerVerifiers = {
  dailymotion: DailyMotionVerifier,
  facebook: FacebookVerifier,
  playable: PlayableVerifier,
  twitch: TwitchVerifier,
  vimeo: VimeoVerifier,
  youtube: YouTubeVerifier,
}

export const playerComponents = {
  dailymotion: DailyMotionPlayer,
  facebook: FacebookPlayer,
  playable: PlayablePlayer,
  twitch: TwitchPlayer,
  vimeo: VimeoPlayer,
  youtube: YouTubePlayer,
}
