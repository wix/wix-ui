/* eslint-disable */
/* tslint:disable */

import * as React from 'react';
import { PopoverNext } from '../';

import { storySettings } from './storySettings';

const children = [
  {
    label: 'Default example',
    value: [
      <PopoverNext.Element key="1">
        This is the PopoverNext.Element
      </PopoverNext.Element>,
      <PopoverNext.Content key="2">Content</PopoverNext.Content>,
    ],
  },
  {
    label: 'Long content example',
    value: [
      <PopoverNext.Element key="1">
        Long content PopoverNext
      </PopoverNext.Element>,
      <PopoverNext.Content key="2">
        Lorem autem ipsam eveniet atque officiis Facere voluptatem eius vitae
        distinctio dolorem quo eveniet? Adipisci hic ut adipisci architecto sunt
      </PopoverNext.Content>,
    ],
  },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: PopoverNext,
  componentPath: '../popover-next.tsx',
  componentProps: {
    'data-hook': storySettings.dataHook,
    children: children[0].value,
    appendTo: 'parent',
    showArrow: true,
    timeout: 150,
    shown: true,
    placement: 'top',
  },

  exampleProps: {
    children,
    onClickOutside: () => 'onClickOutside called!',

    appendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],

    placement: [
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ],
  },
};
