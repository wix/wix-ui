import {HBoxStory} from '../HBox/HBox-story';

export default {
  category: 'Components',
  storyName: 'StylableHBoxStory',
  component: HBoxStory,
  componentPath: '../../src/components/StylableHBox',

  componentProps: (setState, getState) => ({
    'data-hook': 'story-stylablehbox'
  })
};
