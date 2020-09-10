import * as React from 'react';

import CodeBlock from '../../CodeBlock';
import { CodeSection } from '../../typings/story-section';
import styles from './styles.scss';

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
      <React.Suspense
        fallback={<div className={styles.codeLoader}>Loading...</div>}
      >
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
