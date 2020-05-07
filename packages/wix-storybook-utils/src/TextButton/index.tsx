import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

interface Props {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  prefixIcon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const TextButton: React.FunctionComponent<Props> = ({
  className,
  onClick,
  disabled,
  prefixIcon,
  children,
}) => (
  <button
    className={classnames(styles.root, className, {
      [styles.disabled]: disabled,
    })}
    onClick={!disabled && onClick}
    disabled={disabled}
  >
    {prefixIcon && <div className={styles.prefix}>{prefixIcon}</div>}
    {children}
  </button>
);

export default TextButton;
