import * as React from 'react';
import styles from './style.scss';

import Markdown from '../../../Markdown';
import { CopyButton } from '../../../CopyButton';

const wrapWithTicks = (item: string) => `\`\`\`js
${item}
\`\`\``;

export const Code = ({ children, ...rest }) => (
  <div className={styles.root}>
    <div className={styles.code}>
      <Markdown
        data-hook="metadata-import-markdown"
        source={wrapWithTicks(children)}
      />
    </div>

    <CopyButton source={children} />
  </div>
);
