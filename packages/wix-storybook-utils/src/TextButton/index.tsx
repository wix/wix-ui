import React from 'react';
import styles from './styles.scss';

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
    className={[styles.root, className].join(' ')}
    onClick={!disabled && onClick}
    disabled={disabled}
  >
    {prefixIcon && <div className={styles.prefix}>{prefixIcon}</div>}
    {children}
  </button>
);

export default TextButton;
