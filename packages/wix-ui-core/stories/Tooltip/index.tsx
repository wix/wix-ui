import * as React from 'react';
import createStory from '../create-story';

import {Tooltip} from '../../src/components/Tooltip';
import * as TooltipSource from '!raw-loader!../../src/components/Tooltip/index.tsx';

export const story = () => createStory({
    category: 'Components',
    name: 'Tooltip',
    storyName: 'Tooltip',
    component: Tooltip,
    componentProps: () => ({
      'data-hook': 'story-tooltip-right',
        content: <span>Tooltip Content</span>,
        children: <span>Tooltip Children</span>,
        placement: 'right'
    }),
    source: TooltipSource
  });
