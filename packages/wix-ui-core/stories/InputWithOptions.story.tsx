import {InputWithOptions} from '../src/components/InputWithOptions';
import {Option} from '../src/components/DropdownOption';
import {generateOptions} from '../src/components/DropdownOption/OptionsExample';

const options = generateOptions();

export default {
  category: 'Base Components',
  storyName: 'InputWithOptions',
  component: InputWithOptions,
  componentPath: '../src/components/InputWithOptions',

  componentProps: {
    'data-hook': 'storybook-inputwithoptions',
    options,
    inputProps: {},
    fixedFooter: 'Fixed Footer',
    fixedHeader: 'Fixed Header'
  },

  exampleProps: {
    onSelect: (option: Option) => option.value,
    onDeselect: (option: Option) => option.value,
    placement: [
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start'
    ],

    options: [
      {value: options.slice(0, 1), label: '1 example option'},
      {value: options.slice(0, 5), label: '5 example options'},
      {value: options, label: '20 example options'}
    ],

    initialSelectedIds: [
      {value: [1], label: '[1]'},
      {value: [1, 3, 4], label: '[1, 3, 4]'}
    ]
  }
};
