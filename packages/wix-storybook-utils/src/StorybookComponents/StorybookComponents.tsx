import * as React from 'react';
import classnames from 'classnames';
import { PlaceholderProps, StackProps } from './StorybookComponents.types';
import styles from './styles.scss';

const Placeholder: React.FC<PlaceholderProps> = ({
  skin,
  children,
  width,
  height,
}) => (
  <div
    style={{ width, height }}
    className={classnames(styles.placeholder, {
      [styles.light]: skin === 'light',
      [styles.dark]: skin === 'dark',
    })}
  >
    {children}
  </div>
);

Placeholder.defaultProps = {
  skin: 'dark',
};

const Stack: React.FC<StackProps> = ({
  children,
  justifyContent,
  gap,
  flexDirection,
  alignItems,
}) => (
  <div
    style={{ justifyContent, gap, flexDirection, alignItems }}
    className={classnames(styles.stack)}
  >
    {children}
  </div>
);

export default { Placeholder, Stack };
