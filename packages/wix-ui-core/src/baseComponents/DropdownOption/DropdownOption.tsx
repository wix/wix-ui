import * as React from 'react';
import style from './DropdownOption.st.css';
import {Option} from './';

export interface DropdownOptionProps {
  className: string;
  option: Option;
  isSelected: boolean;
  isHovered: boolean;
  onClickHandler: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnterHandler: React.MouseEventHandler<HTMLDivElement>;
}

export const DropdownOption: React.SFC<DropdownOptionProps> = (props: DropdownOptionProps) => {
  const {option, isSelected, isHovered, onClickHandler, onMouseEnterHandler} = props;
  const disabled = option.isDisabled;
  const hovered = !disabled && isHovered;
  const selected = !disabled && isSelected;

  return (
    <div
      {...style('root', {disabled, hovered, selected}, props)}
      onClick={onClickHandler}
      title={option.value}
      onMouseEnter={onMouseEnterHandler}>
      {option.render(option.value)}
    </div>
  );
};
