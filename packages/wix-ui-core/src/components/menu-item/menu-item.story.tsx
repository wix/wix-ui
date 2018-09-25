import * as React from 'react';
import {MenuItem} from './menu-item';
import {TextAreaImage} from 'wix-ui-icons-common/system';

const exampleChildren = [
  {label: 'text', value: 'Hello World'},
  {
    label: 'text with icon',
    value: (
      <div>
        <TextAreaImage size="30px" /> Hello World
      </div>
    )
  }
];

export default {
  category: 'Components',
  storyName: 'MenuItem',
  component: MenuItem,
  componentPath: './menu-item.tsx',

  componentProps: {
    children: exampleChildren[0].value
  },
  exampleProps: {
    children: exampleChildren
  }
};
