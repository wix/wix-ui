import {TimePicker} from '../src/components/TimePicker';

export default {
  category: 'Components',
  storyName: 'TimePicker',
  component: TimePicker,
  componentPath: '../src/components/TimePicker',

  componentProps: (setState) => ({
    'data-hook': 'storybook-timepicker',
    onChange: value => setState({value}),
  }),

  exampleProps: {
    onChange: () => 'Triggered onChange'
  }
};
