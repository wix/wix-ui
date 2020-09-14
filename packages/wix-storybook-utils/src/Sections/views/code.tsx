import * as React from 'react';

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
  noBackground = false,
  initiallyOpen = false,
}) => {
  if (interactive) {
    const LiveCodeExample = React.lazy(() => import('../../LiveCodeExample'));
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <LiveCodeExample
          {...{
            previewProps,
            compact,
            autoRender,
            darkBackground,
            noBackground,
            scope: components,
            initialCode: source.trim(),
            initiallyOpen,
          }}
        />
      </React.Suspense>
    );
  }
  return <CodeBlock source={source.trim()} />;
};
