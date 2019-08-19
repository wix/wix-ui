import * as React from 'react';
import { Thumbnail } from '../src/components/thumbnail';

import Check from 'wix-ui-icons-common/Check';
import Add from 'wix-ui-icons-common/Add';
import Block from 'wix-ui-icons-common/Block';
import { Category } from './utils';

const iconExamples = [Check, Add, Block].map(icon => ({
  label: icon.name,
  value: React.createElement(icon),
}));

const childrenExamples = [
  { label: '<div>hello</div>', value: <div>hello</div> },
  { label: 'Add icon', value: <Add size="64px" /> },
];

export default {
  category: Category.COMPONENTS,
  storyName: 'Thumbnail',

  component: Thumbnail,
  componentPath: '../src/components/thumbnail/Thumbnail.tsx',

  componentProps: {
    'data-hook': 'storybook-thumbnail',
    selectedIcon: iconExamples[0].value,
    children: childrenExamples[0].value,
    selected: false,
  },

  exampleProps: {
    selectedIcon: iconExamples,
    children: childrenExamples,
  },
};
