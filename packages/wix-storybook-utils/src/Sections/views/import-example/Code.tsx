import * as React from 'react';
import styles from './style.scss';

import Markdown from '../../../Markdown';
import { CopyButton } from '../../../CopyButton';

const wrapWithTicks = (item: string) => `\`\`\`js
${item}
\`\`\``;

export const Code = ({ children, dataHook = '' }) => (
  <div data-hook={dataHook} className={styles.root}>
    <div className={styles.code}>
      <Markdown source={wrapWithTicks(children)} />
    </div>

    <CopyButton source={children} />
  </div>
);
