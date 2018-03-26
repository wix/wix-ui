import 'react';
import createStory from '../create-story';

import {TimePicker} from '../../src/components/TimePicker';
import * as TimePickerSource from '!raw-loader!../../src/components/TimePicker/TimePicker.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'TimePicker',
  storyName: 'TimePicker',
  component: TimePicker,
  componentProps: (setState) => ({
    'data-hook': 'storybook-timepicker',
    onChange: value => setState({value}),
  }),
  exampleProps: {
    onChange: () => 'Triggered onChange',
  },
  source: TimePickerSource
});
