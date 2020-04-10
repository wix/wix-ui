import * as React from 'react';
import { style, classes } from './menu-item.st.css';

export interface MenuItemProps {
  /** any node to be rendered inside MenuItem */
  children?: React.ReactNode;

  /** callback which will be called uppon item selection */
  onSelect?(): void;

  /** define if MenuItem is in selected state */
  selected?: boolean;

  /** define if MenuItem is in highlighted state */
  highlighted?: boolean;

  /** define if MenuItem is in disabled state */
  disabled?: boolean;
}

export const MenuItem: React.FunctionComponent<MenuItemProps> = props => {
  const { selected, highlighted, disabled, onSelect, ...rest } = props;

  return (
    <div
      className={style(classes.root, { selected, highlighted, disabled })}
      {...rest}
      data-selected={selected}
      data-highlighted={highlighted}
      data-disabled={disabled}
      onClick={disabled ? () => null : onSelect}
    />
  );
};

MenuItem.displayName = 'MenuItem';
