import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Autocomplete} from '../../src/components/Autocomplete';
import * as AutocompleteSource from '!raw-loader!../../src/components/Autocomplete/Autocomplete.tsx';
import createStory from '../create-story';
import {OptionFactory, Option} from '../../src/baseComponents/DropdownOption';
import {Divider} from '../../src/components/Divider';
import {generateOptions} from '../../src/baseComponents/DropdownOption/OptionsExample';
import {DividerArgs} from '../../src/baseComponents/DropdownOption/OptionFactory';

export const story = () => createStory({
  category: 'Components',
  name: 'Autocomplete',
  storyName: 'Autocomplete',
  component: Autocomplete,
  source: AutocompleteSource,
  componentProps: {
    'data-hook': 'storybook-autocomplete',
    options: generateOptions((args: Partial<DividerArgs> = {}) => Autocomplete.createDivider(args.value))
  },
  exampleProps: {
    fixedFooter: [null, <div>Fixed Footer</div>],
    fixedHeader: [null, <div>Fixed Header</div>],
    onSelect: (option: Option) => option.value,
    initialSelectedId: [null, 1],
    onManualInput: (value: string) => `Manual input: ${value}`
  }
});
