import {Autocomplete} from '../src/components/Autocomplete';
import {Option, DividerArgs} from '../src/components/DropdownOption';
import {generateOptions} from '../src/components/DropdownOption/OptionsExample';

const options = generateOptions((args: Partial<DividerArgs> = {}) => Autocomplete.createDivider(args.value));

export default {
  category: 'Components',
  storyName: 'Autocomplete',
  component: Autocomplete,
  componentPath: '../src/components/Autocomplete',

  componentProps: {
    'data-hook': 'storybook-autocomplete',
    options,
    fixedFooter: 'Fixed Footer',
    fixedHeader: 'Fixed Header',
  },

  exampleProps: {
    onSelect: (option: Option) => option.value,
    onManualInput: (value: string) => `Manual input: ${value}`,
    onBlur: () => 'Triggered onBlur',
    onFocus: () => 'Triggered onFocus',
    onChange: evt => evt.target.value,

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
