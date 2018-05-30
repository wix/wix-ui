import * as React from 'react';

import {InputWithOptions} from '../src/baseComponents/InputWithOptions';
import {Option} from '../src/baseComponents/DropdownOption';
import {generateOptions} from '../src/baseComponents/DropdownOption/OptionsExample';

export default {
  category: 'Base Components',
  storyName: 'InputWithOptions',
  component: InputWithOptions,
  componentPath: '../src/baseComponents/InputWithOptions',

  componentProps: {
    'data-hook': 'storybook-inputwithoptions',
    options: generateOptions(),
    inputProps: {}
  },

  exampleProps: {
    fixedFooter: [null, <div key="1">Fixed Footer</div>],
    fixedHeader: [null, <div key="2">Fixed Header</div>],
    initialSelectedIds: [[], [1]],
    onSelect: (option: Option) => option.value,
    onDeselect: (option: Option) => option.value
  }
};
