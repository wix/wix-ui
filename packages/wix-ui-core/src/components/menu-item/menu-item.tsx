import * as React from 'react';
import { st, classes } from './menu-item.st.css';
import { filterDataProps } from '../../utils/filter-data-props';

export interface MenuItemProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  className?: string;
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

export const MenuItem: React.FunctionComponent<MenuItemProps> = (props) => {
  const {
    selected,
    highlighted,
    disabled,
    onSelect,
    className,
    ...rest
  } = props;

  return (
    <div
      className={st(
        classes.root,
        { selected, highlighted, disabled },
        className,
      )}
      {...rest}
      data-selected={selected}
      data-highlighted={highlighted}
      data-disabled={disabled}
      onClick={disabled ? () => null : onSelect}
      {...filterDataProps(props)}
    />
  );
};

MenuItem.displayName = 'MenuItem';
