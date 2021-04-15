import React from 'react'
import { description } from '../../src/Sections'
import Component from '../Component';
import content from './StoryStructure.content.json';
import * as examples from './examples';
import demo from './demo';

export default {
  category: 'StoryStructure',
  storyName: 'Component',
  component: Component,
  componentPath: '../Component.js',
  story: {
    demo,
    content,
    examples,
    tabs: (tabs) => [
      tabs.design,
      {
        title: 'Style API',
        node: () => <div>I am cool</div>
      },
      tabs.api,
      tabs.testkit,
      tabs.playground,
      {
        title: 'Custom Section',
        sections: [description({
          text: 'I AM SECTION'
        })]
      },
    ],
  },
};
