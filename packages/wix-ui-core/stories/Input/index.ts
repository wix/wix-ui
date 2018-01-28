import 'react';
import createStory from '../create-story';

import {Input} from '../../src/components/Input';
import * as InputSource from '!raw-loader!../../src/components/Input/index.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'Input',
  storyName: 'Input',
  component: Input,
  componentProps: (setState) => ({
    dataHook: 'storybook-input',
    value: '',
    onChange: ({target: {value}}) => setState({value}),
  }),
  exampleProps: {
    onClick: () => 'Triggered onClick',
    onChange: () => 'Triggered onChange',
    onDoubleClick: () => 'Triggered onDoubleClick',
    onBlur: () => 'Triggered onBlur',
    onFocus: () => 'Triggered onFocus',
    onKeyDown: () => 'Triggered onKeyDown',
    onKeyUp: () => 'Triggered onKeyUp'
  },
  source: InputSource
});
