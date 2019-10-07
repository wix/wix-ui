import * as React from 'react';

import LiveCodeExample from '../../LiveCodeExample';
import CodeBlock from '../../CodeBlock';
import { CodeSection } from '../../typings/story-section';

export const code: (a: CodeSection) => React.ReactNode = ({
  source,
  components,
  compact = false,
  previewProps,
  interactive = true,
  autoRender,
  darkBackground = false,
}) =>
  interactive ? (
    <LiveCodeExample
      {...{
        previewProps,
        compact,
        autoRender,
        darkBackground,
        scope: components,
        initialCode: source.trim(),
      }}
    />
  ) : (
    <CodeBlock source={source.trim()} />
  );
