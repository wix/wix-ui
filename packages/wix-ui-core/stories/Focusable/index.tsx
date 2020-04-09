import * as React from 'react';
import Markdown from 'wix-storybook-utils/Markdown';
import Readme from '../../src/hocs/Focusable/README.md';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleFocusableButton from './ExampleFocusableButton';
import * as ExampleFocusableButtonRaw from '!raw-loader!./ExampleFocusableButton';

const Example = () => (
  <div>
    <Markdown source={Readme} />

    <CodeExample
      title="Focusable Input Example"
      code={ExampleFocusableButtonRaw}
    >
      <ExampleFocusableButton />
    </CodeExample>
  </div>
);

export default Example;
