import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from './input';
import Search from 'wix-ui-icons-common/Search';

import styles from './styles.scss';

const SearchInput = ({ dataHook, className, inputClassName, ...props }) => (
  <div className={classnames(styles.searchInputContainer, className)}>
    <Input
      placeholder="Search Icons"
      className={classnames(styles.searchInput, inputClassName)}
      data-hook={dataHook}
      {...props}
    />
    <Search className={styles.searchIcon} />
  </div>
);

SearchInput.propTypes = {
  dataHook: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default SearchInput;
