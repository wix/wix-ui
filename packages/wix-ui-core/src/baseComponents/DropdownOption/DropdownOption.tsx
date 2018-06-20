import * as React from 'react';
import style from './DropdownOption.st.css';
import {Option} from './';

export interface DropdownOptionProps {
  className: string;
  option: Option;
  isSelected: boolean;
  isHovered: boolean;
  onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseEnterHandler: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export type DropdownOptionType = React.SFC<DropdownOptionProps>;

export const DropdownOption: DropdownOptionType = (props: DropdownOptionProps) => {
  const {option, isSelected, isHovered, onClickHandler, onMouseEnterHandler} = props;
  const disabled = option.isDisabled;
  const selectable = option.isSelectable;
  const hovered = !disabled && isHovered;
  const selected = !disabled && isSelected;

  return (
    <div
      {...style('root', {disabled, selectable, hovered, selected}, props)}
      onClick={onClickHandler}
      title={option.value}
      onMouseEnter={onMouseEnterHandler}
    >
      {option.render(option.value)}
    </div>
  );
};

DropdownOption.displayName = 'DropdownOption';
