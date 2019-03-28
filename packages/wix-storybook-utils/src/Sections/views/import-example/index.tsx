import * as React from 'react';

import { ImportExampleSection } from '../../../typings/story-section';

import Markdown from '../../../Markdown';
import { CopyButton } from '../../../CopyButton';
import styles from './style.scss';

const wrapWithTicks = (item: string) => `\`\`\`js
${item}
\`\`\``;

export const importExample: (a: ImportExampleSection) => React.ReactNode = ({
  source,
}) =>
  typeof source === 'string' ? (
    <div className={styles.root}>
      <div className={styles.code}>
        <Markdown source={wrapWithTicks(source.trim())} />
      </div>

      <CopyButton source={source.trim()} />
    </div>
  ) : (
    source
  );
