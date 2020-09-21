import React from 'react';
import classnames from 'classnames';
import Input from './input';
import Search from 'wix-ui-icons-common/Search';

import styles from './styles.scss';

const SearchInput = ({
  onChange,
  dataHook,
  className,
  inputClassName,
  ...props
}) => (
  <div className={classnames(styles.searchInputContainer, className)}>
    <Input
      onChange={onChange}
      placeholder="Search Icons"
      className={classnames(styles.searchInput, inputClassName)}
      data-hook={dataHook}
      {...props}
    />
    <Search className={styles.searchIcon} />
  </div>
);

export default SearchInput;
