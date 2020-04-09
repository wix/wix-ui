import * as React from 'react';
import Markdown from 'wix-storybook-utils/Markdown';
import Readme from '../../src/components/loadable/README.md';
import CodeExample from 'wix-storybook-utils/CodeExample';

import AsyncLoadableWithInitialLoad from './AsyncLoadableWithInitialLoad';
import * as AsyncLoadableWithInitialLoadExample from '!raw-loader!./AsyncLoadableWithInitialLoad';

import SyncLoadableWithInitialLoad from './SyncLoadableWithInitialLoad';
import * as SyncLoadableWithInitialLoadExample from '!raw-loader!./SyncLoadableWithInitialLoad';

import AsyncLoadableWithManualLoad from './AsyncLoadableWithManualLoad';
import * as AsyncLoadableWithManualLoadExample from '!raw-loader!./AsyncLoadableWithManualLoad';

import SyncLoadableWithManualLoad from './SyncLoadableWithManualLoad';
import * as SyncLoadableWithManualLoadExample from '!raw-loader!./SyncLoadableWithManualLoad';

export const LoadableStory: React.FunctionComponent = () => (
  <div>
    <Markdown source={Readme} />

    <CodeExample
      title="Loadable with Lazy Loading and `import()`"
      code={AsyncLoadableWithInitialLoadExample}
    >
      <AsyncLoadableWithInitialLoad />
    </CodeExample>

    <CodeExample
      title="Loadable with Lazy Loading and `require()`"
      code={SyncLoadableWithInitialLoadExample}
    >
      <SyncLoadableWithInitialLoad />
    </CodeExample>

    <CodeExample
      title="Loadable with Lazy Loading and shouldLoadComponent trigger to use `import()`"
      code={AsyncLoadableWithManualLoadExample}
    >
      <AsyncLoadableWithManualLoad />
    </CodeExample>

    <CodeExample
      title="Loadable with Lazy Loading and shouldLoadComponent trigger to use `require()`"
      code={SyncLoadableWithManualLoadExample}
    >
      <SyncLoadableWithManualLoad />
    </CodeExample>
  </div>
);
