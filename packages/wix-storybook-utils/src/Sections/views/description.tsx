import * as React from 'react';
import classnames from 'classnames';

import { DescriptionSection } from '../../typings/story-section';
import Markdown from '../../Markdown';
import styles from './styles.scss';

export const description: (a: DescriptionSection) => React.ReactNode = ({
  dataHook = '',
  text,
  size = 'normal',
  width = '100%',
}) => (
  <div
    style={{ width }}
    className={classnames(styles.description, {
      [styles.descriptionSmall]: size === 'small',
    })}
  >
    {typeof text === 'string' ? (
      <Markdown data-hook={`${dataHook}-markdown`} source={text} />
    ) : (
      text
    )}
  </div>
);
