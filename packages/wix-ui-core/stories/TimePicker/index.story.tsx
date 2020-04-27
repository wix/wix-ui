import { TimePicker } from '../../src/components/time-picker';
import { AmPmOptions } from '../../src/components/time-picker/constants';
import { classes } from './style.st.css';
import { Category } from '../utils';

export default {
  category: Category.COMPONENTS,
  storyName: 'TimePicker',
  component: TimePicker,
  componentPath: '../../src/components/time-picker',

  componentProps: setState => ({
    className: classes.root,
    'data-hook': 'storybook-timepicker',
    onChange: value => setState({ value }),
    tickerUpIcon: '+',
    tickerDownIcon: '-',
    step: 1,
  }),

  exampleProps: {
    onChange: () => 'Triggered onChange',
    useAmPm: Object.keys(AmPmOptions).map(key => AmPmOptions[key]),
  },
};
