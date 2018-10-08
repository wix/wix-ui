import * as React from 'react';
import * as PropTypes from 'prop-types';
import style from './menu-item.st.css';

export interface MenuItemProps {
  /** any node to be rendered inside MenuItem */
  children?: React.ReactNode;

  /** callback which will be called uppon item selection */
  onSelect?: () => void;

  /** define if MenuItem is in selected state */
  selected?: boolean;

  /** define if MenuItem is in highlighted state */
  highlighted?: boolean;

  /** define if MenuItem is in disabled state */
  disabled?: boolean;
}

export const MenuItem : React.SFC<MenuItemProps> = props => {
  const {selected, highlighted, disabled, onSelect, ...rest} = props;

  return (
    <div
      {...style('root', {selected, highlighted, disabled}, props)}
      {...rest}
      onClick={disabled ? () => null : onSelect}
    />
  );
};

MenuItem.propTypes = {
  children: PropTypes.node,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  highlighted: PropTypes.bool,
  disabled: PropTypes.bool
};

MenuItem.displayName = 'MenuItem';
