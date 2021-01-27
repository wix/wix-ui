import { Component } from '../TypeScriptComponent';
import { tabs, tab, api } from '../../src/Sections';

export default {
  category: 'Typescript',
  storyName: 'API section',
  component: Component,
  componentPath: '../TypeScriptComponent.tsx',

  sections: [
    tabs([
      tab({
        title: 'API',
        sections: [api()],
      }),
    ]),
  ],
};
