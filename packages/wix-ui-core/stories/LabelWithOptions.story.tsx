import * as React from 'react';

import {LabelWithOptions} from '../src/components/label-with-options';
import {generateOptions} from '../src/components/dropdown-option/OptionsExample';
import {Option} from '../src/components/dropdown-option';

const options = generateOptions();

export default {
  category: 'Components',
  name: 'LabelWithOptions',
  component: LabelWithOptions,
  componentPath: '../src/components/label-with-options',

  componentProps: {
    'data-hook': 'storybook-labelwithoptions',
    renderSuffix: isError => <span>{isError ? '☹️' : '😁'}</span>,
    options,
    multi: true,
    placeholder: 'With placeholder',
    fixedFooter: 'Fixed Footer',
    fixedHeader: 'Fixed Header'
  },

  exampleProps: {
    onSelect: (option: Option) => option.value,
    onDeselect: (option: Option) => option.value,
    initialSelectedId: [
      {value: [1], label: '[1]'},
      {value: [1, 2, 3], label: '[1, 2, 3]'}
    ],

    options: [
      {value: options.slice(0, 1), label: '1 example option'},
      {value: options.slice(0, 5), label: '5 example options'},
      {value: options, label: '20 example options'}
    ]
  }
};
