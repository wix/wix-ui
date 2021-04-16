import React from 'react'
import { description } from '../../src/Sections'
import Component from '../Component';
import content from './StoryStructure.content.json';
import * as examples from './examples';
import demo from './demo';

const StyleComponent = () => <div>I am cool</div>

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
      tabs.api,
      tabs.testkit,
      tabs.playground,
      {
        title: 'Custom Section',
        sections: [description({
          text: 'I AM SECTION'
        })]
      },
      {
        title: 'Custom Section 2',
      },
      {
        title: 'Style API',
        node: <StyleComponent/>,
        sections: [description({
          text: 'I AM SECTION'
        })]
      }
    ],
  },
};


