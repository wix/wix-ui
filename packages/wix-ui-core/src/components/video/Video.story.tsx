import { Video } from '.';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Video,
  componentPath: 'Video.tsx',

  componentProps: {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    width: 400,
    height: 225,
    controls: true,
    loop: false,
    muted: false,
    playing: false,
    onReady: () => 'Triggered onReeady',
    onPlay: () => 'Triggered onPlay',
    onPause: () => 'Triggered onPause',
    onEnd: () => 'Triggered onEnd',
    'data-hook': 'storybook-video',
  },

  exampleProps: {
    src: [
      {
        label: 'DailyMotion',
        value: 'https://www.dailymotion.com/video/x5e9eog',
      },
      {
        label: 'Facebook',
        value: 'https://www.facebook.com/facebook/videos/10153231379946729/',
      },
      { label: 'Twitch', value: 'https://www.twitch.tv/videos/106400740' },
      {
        label: 'Video File',
        value: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      },
      { label: 'Vimeo', value: 'https://vimeo.com/90509568' },
      {
        label: 'Youtube',
        value: 'https://www.youtube.com/watch?v=oUFJJNQGwhk',
      },
    ],
    config: [
      {
        label: 'custom Playable config',
        value: {
          playable: {
            playButton: 'Play',
            preload: 'auto',
            title: 'Awesome title',
            poster:
              'https://images-vod.wixmp.com/d0220cbc-4355-4bc0-8ebe-53e9ab8843ba/images/23a7996667c04ebc8bd7e9b6141e30cb~mv2/v1/fill/w_400,h_225,q_85,usm_0.66_1.00_0.01/file.jpg',
            logoUrl:
              'https://images-wixmp-01bd43eabd844aac9eab64f5.wixmp.com/images/White+Wix+logo+Assets+Transparent.png/v1/fit/w_475,h_150/White+Wix+logo+Assets+Transparent.png',
            alwaysShowLogo: true,
            hideMainUI: false,
            texts: {
              'live-indicator-text': ({ isEnded }) =>
                !isEnded ? 'Live' : 'Live Ended',
              'logo-tooltip': 'Watch On Site',
              'mute-control-tooltip': 'Mute Video',
            },
          },
        },
      },
      {
        label: 'custom DailyMotion config',
        value: {
          dailymotion: {
            playerOptions: {
              'sharing-enable': true,
            },
          },
        },
      },
      {
        label: 'custom Youtube config',
        value: {
          youtube: {
            playerOptions: {
              color: '#00ff00',
            },
          },
        },
      },
    ],
  },
};
