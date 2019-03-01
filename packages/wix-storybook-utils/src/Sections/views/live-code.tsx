import * as React from 'react';

import LiveCodeExample from '../../LiveCodeExample';
import CodeBlock from '../../CodeBlock';
import { LiveCodeSection } from '../../typings/story-section';

export const liveCode: (a: LiveCodeSection) => React.ReactNode = ({
  source,
  components,
  compact = false,
  previewProps,
  interactive = true,
  autoRender,
}) =>
  interactive ? (
    <LiveCodeExample
      previewProps={previewProps}
      compact={compact}
      scope={components}
      initialCode={source.trim()}
      autoRender={autoRender}
    />
  ) : (
    <CodeBlock source={source.trim()} />
  );
