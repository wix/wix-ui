import * as React from 'react';
import createStory from '../create-story';
import {LabelWithOptions} from '../../src/components/LabelWithOptions';
import * as LabelWithOptionsSource from '!raw-loader!../../src/components/LabelWithOptions/LabelWithOptions.tsx';
import {generateOptions} from '../../src/baseComponents/DropdownOption/OptionsExample';
import {Option} from '../../src/baseComponents/DropdownOption';
const CodeExample = require('../../src/components/LabelWithOptions/CodeExample.md');

export const story = () => createStory({
  category: 'Components',
  name: 'LabelWithOptions',
  storyName: 'LabelWithOptions',
  component: LabelWithOptions,
  source: LabelWithOptionsSource,
  codeBlockSource: CodeExample,
  componentProps: {
    'data-hook': 'storybook-labelwithoptions',
    renderSuffix: isError => <span>{isError ? '☹️' : '😁'}</span>,
    options: generateOptions(),
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
});
