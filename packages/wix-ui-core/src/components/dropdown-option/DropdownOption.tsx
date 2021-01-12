import * as React from 'react';
import { st, classes } from './DropdownOption.st.css';
import { Option } from './';

export interface DropdownOptionProps {
  id?: string;
  className: string;
  option: Option;
  isSelected: boolean;
  isHovered: boolean;
  onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseEnterHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
  dataHook?: string;
}

export type DropdownOptionType = React.FunctionComponent<DropdownOptionProps>;

export const DropdownOption: DropdownOptionType = (
  props: DropdownOptionProps,
) => {
  const {
    id,
    option,
    isSelected,
    isHovered,
    onClickHandler,
    onMouseEnterHandler,
    dataHook,
  } = props;
  const disabled = option.isDisabled;
  const selectable = option.isSelectable;
  const hovered = !disabled && isHovered;
  const selected = !disabled && isSelected;

  const ariaProps = selectable
    ? { role: 'menuitem', 'aria-selected': selected, 'aria-disabled': disabled }
    : {};

  return (
    <div
      id={id}
      tabIndex={-1}
      className={st(
        classes.root,
        { disabled, selectable, hovered, selected },
        props.className,
      )}
      data-hook={dataHook}
      {...ariaProps}
      onClick={onClickHandler}
      title={option.value}
      onMouseEnter={onMouseEnterHandler}
    >
      {option.render(option.value)}
    </div>
  );
};

DropdownOption.displayName = 'DropdownOption';
