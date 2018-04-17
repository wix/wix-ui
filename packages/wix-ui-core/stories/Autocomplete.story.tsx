import * as React from 'react';

import {Autocomplete} from '../src/components/Autocomplete';
import {Option, DividerArgs} from '../src/baseComponents/DropdownOption';
import {generateOptions} from '../src/baseComponents/DropdownOption/OptionsExample';

export default {
  category: 'Components',
  storyName: 'Autocomplete',
  component: Autocomplete,
  componentPath: '../src/components/Autocomplete',

  componentProps: {
    'data-hook': 'storybook-autocomplete',
    options: generateOptions((args: Partial<DividerArgs> = {}) => Autocomplete.createDivider(args.value))
  },

  exampleProps: {
    fixedFooter: [null, <div>Fixed Footer</div>],
    fixedHeader: [null, <div>Fixed Header</div>],
    onSelect: (option: Option) => option.value,
    initialSelectedId: [null, 1],
    onManualInput: (value: string) => `Manual input: ${value}`,
    onBlur: () => 'Triggered onBlur',
    onFocus: () => 'Triggered onFocus',
    onChange: evt => evt.target.value
  }
};
