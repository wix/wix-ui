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
    children: [<Popover.Element key="1">element</Popover.Element>, <Popover.Content key="2">Content</Popover.Content>],
    appendTo: 'window', //null, 'scrollParent', 'viewport'
    // shown: true,
    showArrow: true,
    timeout: 150
  }
};
