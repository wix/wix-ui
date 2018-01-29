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
    children: <span>Hover me for a tooltip!</span>,
    placement: 'right',
    content: 'I\'m a tooltip',
    dataHook: 'story-tooltip-right'
  }),
  source: TooltipSource
});
