import * as React from 'react';

import CodeBlock from '../../CodeBlock';
import { CodeSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';

export const code: (a: CodeSection, b: StoryConfig) => React.ReactNode = (
  {
    source,
    components,
    compact = false,
    previewProps,
    interactive = true,
    autoRender,
    darkBackground = false,
    noBackground = false,
    initiallyOpen = false,
    title,
  },
  storyConfig,
) => {
  const playgroundComponents = storyConfig.config.playgroundComponents || {};

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
            scope: {
              ...components,
              ...playgroundComponents,
            },
            initialCode: source.trim(),
            initiallyOpen,
            hints: storyConfig.hints,
            title,
            storyName: storyConfig.storyName,
            storage: window.sessionStorage,
          }}
        />
      </React.Suspense>
    );
  }
  return <CodeBlock source={source.trim()} />;
};
