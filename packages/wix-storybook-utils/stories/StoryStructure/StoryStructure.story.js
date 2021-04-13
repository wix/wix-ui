import React from 'react'
import Component from '../Component';
import content from './StoryStructure.content.json';
import * as examples from './examples';
import demo from './demo'


export default {
  category: 'StoryStructure',
  storyName: 'Component',
  component: Component,
  componentPath: '../Component.js',
  story: {
    demo,
    content,
    examples,
  }
};

