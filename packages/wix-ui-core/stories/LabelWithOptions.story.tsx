import * as React from 'react';

import {LabelWithOptions} from '../src/components/LabelWithOptions';
import {generateOptions} from '../src/baseComponents/DropdownOption/OptionsExample';
import {Option} from '../src/baseComponents/DropdownOption';

export default {
  category: 'Components',
  name: 'LabelWithOptions',
  component: LabelWithOptions,
  componentPath: '../src/components/LabelWithOptions',

  componentProps: {
    'data-hook': 'storybook-labelwithoptions',
    renderSuffix: isError => <span>{isError ? '☹️' : '😁'}</span>,
    options: generateOptions(),
    multi: true,
    placeholder: 'With placeholder'
  },

  exampleProps: {
    fixedFooter: [null, <div>Fixed Footer</div>],
    fixedHeader: [null, <div>Fixed Header</div>],
    onSelect: (option: Option) => option.value,
    onDeselect: (option: Option) => option.value,
    initialSelectedIds: [null, [1]],
    placeholder: ['With placeholder', null]
  }
};
