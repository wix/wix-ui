import * as React from 'react';
import {Tooltip} from '../../src/components/Tooltip';

export default {
  category: 'Components',
  storyName: 'Tooltip',
  component: Tooltip,
  componentPath: '../../src/components/Tooltip/Tooltip.tsx',

  componentProps: {
    'data-hook': 'story-tooltip-right',
    content: <span>This is my tooltip</span>,
    children: <span>Hover me for a tooltip!</span>,
    placement: 'right'
  },

  exampleProps: {
    placement: 'right'
  }
};
