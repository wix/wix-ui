import * as React from 'react';
import createStory from '../create-story';
import {LabelWithOptions} from '../../src/components/LabelWithOptions';
import * as LabelWithOptionsSource from '!raw-loader!../../src/components/LabelWithOptions/LabelWithOptions.tsx';
import {generateOptions} from '../../src/baseComponents/DropdownOption/OptionsExample';

export const story = () => createStory({
  category: 'Components',
  name: 'LabelWithOptions',
  storyName: 'LabelWithOptions',
  component: LabelWithOptions,
  source: LabelWithOptionsSource,
  componentProps: {
    renderSuffix: isInvalid => <span>{isInvalid ? '☹️' : '😁'}</span>,
    options: generateOptions(),
    placeholder: 'Click to select',
  }
});
