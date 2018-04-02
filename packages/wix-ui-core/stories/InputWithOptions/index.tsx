import * as React from 'react';
import createStory from '../create-story';
import {InputWithOptions} from '../../src/baseComponents/InputWithOptions';
import * as InputWithOptionsSource from '!raw-loader!../../src/baseComponents/InputWithOptions/InputWithOptions.tsx';
import {Option} from '../../src/baseComponents/DropdownOption';
import {generateOptions} from '../../src/baseComponents/DropdownOption/OptionsExample';
import Markdown from 'wix-storybook-utils/Markdown';
const CodeExample = require('../../src/baseComponents/InputWithOptions/CodeExample.md');

export const story = () => createStory({
  category: 'Base Components',
  name: 'InputWithOptions',
  storyName: 'InputWithOptions',
  component: InputWithOptions,
  source: InputWithOptionsSource,
  codeBlockSource: CodeExample,
  componentProps: {
    'data-hook': 'storybook-inputwithoptions',
    options: generateOptions(),
    inputProps: {}
  },
  exampleProps: {
    fixedFooter: [null, <div>Fixed Footer</div>],
    fixedHeader: [null, <div>Fixed Header</div>],
    initialSelectedIds: [[], [1]],
    onSelect: (option: Option) => option.value,
    onDeselect: (option: Option) => option.value
  }
});
