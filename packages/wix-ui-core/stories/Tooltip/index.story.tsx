import * as React from 'react';
import {Tooltip} from '../../src/components/Tooltip';

const childrenExamples = [
  {label: 'Simple text',
    value: <span>Hover me for a tooltip!</span>
  }
];

const contentExamples = [
  {label: 'Simple text',
    value: <span>This is my tooltip</span>
  }
];

export default {
  category: 'Components',
  storyName: 'Tooltip',
  component: Tooltip,
  componentPath: '../../src/components/Tooltip/Tooltip.tsx',

  componentProps: {
    'data-hook': 'story-tooltip-right',
    content: contentExamples[0].value,
    children: childrenExamples[0].value,
    placement: 'right'
  },

  exampleProps: {
    children: childrenExamples,
    content: contentExamples,
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
      'left-start'
    ]
  }
};
