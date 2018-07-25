import * as React from 'react';
import Markdown from 'wix-storybook-utils/Markdown';
import * as Readme from '../../src/hocs/Focusable/README.md';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleFocusableButton from './ExampleFocusableButton';
import * as ExampleFocusableButtonRaw from '!raw-loader!./ExampleFocusableButton';

const Example: React.SFC = () => (
  <div>
    <Markdown source={Readme}/>

    <CodeExample title="Ellipsis Without Tooltip Example" code={ExampleFocusableButtonRaw}>
      <ExampleFocusableButton/>
    </CodeExample>
  </div>
);

export default Example;
