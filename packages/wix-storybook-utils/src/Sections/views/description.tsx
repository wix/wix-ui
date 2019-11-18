import * as React from 'react';

import { DescriptionSection } from '../../typings/story-section';
import Markdown from '../../Markdown';
import styles from './styles.scss';

export const description: (a: DescriptionSection) => React.ReactNode = ({
  dataHook = '',
  text,
}) => (
  <div className={styles.description}>
    {typeof text === 'string' ? (
      <Markdown data-hook={`${dataHook}-markdown`} source={text} />
    ) : (
      text
    )}
  </div>
);
