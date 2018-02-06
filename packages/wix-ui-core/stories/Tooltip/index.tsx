import * as React from 'react';
import createStory from '../create-story';

import {Tooltip} from '../../src/components/Tooltip';
import * as TooltipSource from '!raw-loader!../../src/components/Tooltip/Tooltip.tsx';

export const story = () => createStory({
    category: 'Components',
    name: 'Tooltip',
    storyName: 'Tooltip',
    component: Tooltip,
    componentProps: () => ({
      'data-hook': 'story-tooltip-right',
      content: <span>This is my tooltip</span>,
      children: <span>Hover me for a tooltip!</span>,
      placement: 'right'
    }),
    exampleProps: {
      placement: 'right'
    },
    source: TooltipSource
  });
