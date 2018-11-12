import {Label} from '../src/components/deprecated/Label';
import {StoryConfig} from 'wix-storybook-utils/src/typings/story-config';

const story: StoryConfig = {
  category: 'Components',
  storyName: 'Label',

  component: Label,
  componentPath: '../src/components/deprecated/Label/Label.tsx',

  componentProps: {
    'data-hook': 'storybook-label',
    children: 'hello',
    ellipsis: false
  }
};

export default story;
