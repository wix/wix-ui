import { Category } from '../../../stories/storiesHierarchy';

export const storySettings = {
  category: Category.{%CATEGORY%},
  storyName: '{%ComponentName%}',
  dataHook: 'story-{%component-name%}',
  testStoryNames: {
    DEFAULT: 'Default',
  },
};
