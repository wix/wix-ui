import {InputWithOptions} from '../src/baseComponents/InputWithOptions';
import {Option} from '../src/baseComponents/DropdownOption';
import {generateOptions} from '../src/baseComponents/DropdownOption/OptionsExample';

const options = generateOptions();

export default {
  category: 'Base Components',
  storyName: 'InputWithOptions',
  component: InputWithOptions,
  componentPath: '../src/baseComponents/InputWithOptions',

  componentProps: {
    'data-hook': 'storybook-inputwithoptions',
    options,
    inputProps: {},
    fixedFooter: 'Fixed Footer',
    fixedHeader: 'Fixed Header'
  },

  exampleProps: {
    initialSelectedIds: [[], [1]],
    onSelect: (option: Option) => option.value,
    onDeselect: (option: Option) => option.value,

    options: [
      {value: options.slice(0, 1), label: '1 example option'},
      {value: options.slice(0, 5), label: '5 example options'},
      {value: options, label: '20 example options'}
    ],

    initialSelectedId: [
      {value: [1], label: '[1]'},
      {value: [1, 2, 3], label: '[1, 2, 3]'}
    ]
  }
};
