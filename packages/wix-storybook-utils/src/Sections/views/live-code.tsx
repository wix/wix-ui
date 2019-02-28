import * as React from 'react';

const LiveCodeExample = require('../../LiveCodeExample').default;
const CodeBlock = require('../../CodeBlock').default;
import { LiveCodeSection } from '../../typings/story-section';

export const liveCode: (a: LiveCodeSection) => React.ReactNode = ({
  source,
  components,
  compact = false,
  previewProps,
  interactive = true,
  autoRender
}) =>
  interactive ? (
    <LiveCodeExample
      previewProps={previewProps}
      compact={compact}
      scope={components}
      initialCode={source}
      autoRender={autoRender}
    />
  ) : (
    <CodeBlock source={source} />
  );
