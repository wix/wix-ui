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
  width,
  height,
  flexDirection,
  alignItems,
  padding,
  margin,
}) => (
  <div
    style={{
      justifyContent,
      gap,
      flexDirection,
      alignItems,
      padding,
      margin,
      width,
      height,
    }}
    className={classnames(styles.stack)}
  >
    {children}
  </div>
);

export default { Placeholder, Stack };
