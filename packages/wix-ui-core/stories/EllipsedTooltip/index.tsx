import * as React from 'react';
import Markdown from 'wix-storybook-utils/Markdown';
import * as Readme from '../../src/hocs/EllipsedTooltip/README.md';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleWithoutTooltip from './ExampleWithoutTooltip';
import * as ExampleWithoutTooltipRaw from '!raw-loader!./ExampleWithoutTooltip';

import ExampleWithTooltip from './ExampleWithTooltip';
import * as ExampleWithTooltipRaw from '!raw-loader!./ExampleWithTooltip';

import ExampleNotEllipsed from './ExampleNotEllipsed';
import * as ExampleNotEllipsedRaw from '!raw-loader!./ExampleNotEllipsed';

const Example: React.SFC = () => (
  <div>
    <Markdown source={Readme}/>

    <CodeExample title="Ellipsis Without Tooltip Example" code={ExampleWithoutTooltipRaw}>
      <ExampleWithoutTooltip/>
    </CodeExample>

    <CodeExample title="Ellipsis With Tooltip Example" code={ExampleWithTooltipRaw}>
      <ExampleWithTooltip/>
    </CodeExample>

    <CodeExample title="Short Text Not Ellipsed Example" code={ExampleNotEllipsedRaw}>
      <ExampleNotEllipsed/>
    </CodeExample>
  </div>
);

export default Example;
