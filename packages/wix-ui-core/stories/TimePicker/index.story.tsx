import {TimePicker} from '../../src/components/TimePicker';
import {AmPmOptions} from '../../src/components/TimePicker/constants';
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
    step: 1
  }),

  exampleProps: {
    onChange: () => 'Triggered onChange',
    useAmPm: Object.keys(AmPmOptions).map(key => AmPmOptions[key])
  }
};
