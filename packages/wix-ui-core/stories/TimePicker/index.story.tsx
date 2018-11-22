import {TimePicker} from '../../src/components/time-picker';
import {AmPmOptions} from '../../src/components/time-picker/constants';
import style from './style.st.css';

export default {
  category: 'Components',
  storyName: 'TimePicker',
  component: TimePicker,
  componentPath: '../../src/components/time-picker',

  componentProps: setState => ({
    ...style('root'),
    'data-hook': 'storybook-timepicker',
    onChange: value => setState({value}),
    tickerUpIcon: '+',
    tickerDownIcon: '-',
    step: 1
  }),

  exampleProps: {
    onChange: () => 'Triggered onChange',
    useAmPm: Object.keys(AmPmOptions).map(key => AmPmOptions[key])
  }
};
