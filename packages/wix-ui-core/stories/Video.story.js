import {Video} from '../src/components/Video';

export default {
  category: 'Components',
  storyName: 'Video',
  component: Video,
  componentPath: '../src/components/Video/Video.tsx',

  componentProps: setState => ({
    src: 'https://wixmp-01bd43eabd844aac9eab64f5.wixmp.com/videos/output/720p/Highest Peak.mp4',
    poster: 'https://images-vod.wixmp.com/d0220cbc-4355-4bc0-8ebe-53e9ab8843ba/images/23a7996667c04ebc8bd7e9b6141e30cb~mv2/v1/fill/w_400,h_225,q_85,usm_0.66_1.00_0.01/file.jpg',
    width: 400,
    height: 225,
    title: 'Awesome title',
    playButton: 'Play',
    onPlay: () => setState({playing: true}),
    onPause: () => setState({playing: false}),
  }),

  exampleProps: {
    onPlay: () => 'Triggered onPlay',
    onPause: () => 'Triggered onPause',
    onEnd: () => 'Triggered onEnd'
  }
};
