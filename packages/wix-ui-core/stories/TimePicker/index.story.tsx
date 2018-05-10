import {TimePicker} from '../../src/components/TimePicker';
import style from './style.st.css';

export default {
  category: 'Components',
  storyName: 'TimePicker',
  component: TimePicker,
  componentPath: '../../src/components/TimePicker',

  componentProps: setState => ({
    ...style('root'),
    'data-hook': 'storybook-timepicker',
    onChange: value => setState({value}),
  }),

  exampleProps: {
    onChange: () => 'Triggered onChange'
  }
};
