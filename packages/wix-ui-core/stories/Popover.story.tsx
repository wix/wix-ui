import * as React from 'react';
import {Popover} from '../src/components/Popover';
import {Option} from '../src/baseComponents/DropdownOption';

export default {
  category: 'Components',
  storyName: 'Popover',
  component: Popover,
  componentPath: '../src/components/Popover/Popover.tsx',
  componentProps: {
    'data-hook': 'storybook-popover',
    children: [<Popover.Element>element</Popover.Element>, <Popover.Content>Content</Popover.Content>],
    appendTo: 'window',
    shown: true,
    showArrow: true
  },
  exampleProps: {
    appendTo: [null, 'scrollParent', 'viewport', 'window']  //TODO - should display in storybook somehow
  }
};
