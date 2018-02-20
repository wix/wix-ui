import * as React from 'react';
import createStory from '../create-story';
import {InputWithOptions} from '../../src/components/InputWithOptions';
import * as InputWithOptionsSource from '!raw-loader!../../src/components/InputWithOptions/InputWithOptions.tsx';
import {OptionFactory} from '../../src/baseComponents/DropdownOption';

const dropdownOptions =
  Array.from(Array(20))
    .map((x, index) =>
      index === 5 ?
        OptionFactory.createDivider() :
        OptionFactory.create(index, index === 3, true, index === 15 ? 'fdsf sdf sdf sdf sdf sdfsd fsdf sdf ds' : `value${index}`));

export const story = () => createStory({
  category: 'Components',
  name: 'InputWithOptions',
  storyName: 'InputWithOptions',
  component: InputWithOptions,
  source: InputWithOptionsSource,
  componentProps: {
    'data-hook': 'storybook-inputwithoptions',
    options: dropdownOptions,
    inputProps: {}
  },
  exampleProps: {
    fixedFooter: [null, <div>Fixed Footer</div>],
    fixedHeader: [null, <div>Fixed Header</div>]
  }
});
