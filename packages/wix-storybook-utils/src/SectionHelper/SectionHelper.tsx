import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

type SectionHelperProps = {
  children: React.ReactNode;
  className?: string;
}

const SectionHelper: React.FC<SectionHelperProps> = ({
  className,
  children,
}) => (
  <div className={classnames(styles.root, className)}>
    {children}
  </div>
);

export default SectionHelper;
