import {SocialPlayer} from '../src/components/SocialPlayer';

export default {
  category: 'Components',
  storyName: 'SocialPlayer',
  component: SocialPlayer,
  componentPath: '../src/components/SocialPlayer/SocialPlayer.tsx',

  componentProps: {
    src: 'https://www.youtube.com/watch?v=sIgv3tTYYqQ',
    width: 400,
    height: 225,
    controls: true,
    loop: false,
    muted: false
  },

  exampleProps: {
    onPlay: () => 'Triggered onPlay',
    onPause: () => 'Triggered onPause',
    onEnd: () => 'Triggered onEnd'
  }
};
