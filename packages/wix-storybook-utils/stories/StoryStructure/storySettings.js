import Component from '../Component';

export const storySettings = {
  category: 'StoryStructure',
  storyName: 'Component',
  component: Component,
  componentPath: '../Component.js',
  modifyExamples: (example) =>
    example === '_advancedRadioGroup' && { mode: 'landscape' },
};
