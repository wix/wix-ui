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
}) =>
  interactive ? (
    <LiveCodeExample
      previewProps={previewProps}
      compact={compact}
      scope={components}
      initialCode={source}
    />
  ) : (
    <CodeBlock source={source} />
  );
