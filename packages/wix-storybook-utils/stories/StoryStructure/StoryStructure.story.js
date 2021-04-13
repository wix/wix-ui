import Component from '../Component';
import content from './StoryStructure.content.json';
import * as examples from './examples';


export default {
  category: 'StoryStructure',
  storyName: 'Component',
  component: Component,
  componentPath: '../Component.js',
  story: {
    content,
    examples,
  }
};

