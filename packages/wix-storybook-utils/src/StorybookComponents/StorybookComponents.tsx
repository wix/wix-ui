import * as React from 'react';
import classnames from 'classnames';
import {
  BackgroundProps,
  PlaceholderProps,
  StackProps,
} from './StorybookComponents.types';
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

const Background: React.FC<BackgroundProps> = ({ skin, children }) => (
  <div
    className={classnames(styles.background, {
      [styles.dark]: skin === 'dark',
      [styles.light]: skin === 'light',
      [styles.blue]: skin === 'blue',
      [styles.yellow]: skin === 'yellow',
    })}
  >
    {children}
  </div>
);

export default { Placeholder, Stack, Background };
