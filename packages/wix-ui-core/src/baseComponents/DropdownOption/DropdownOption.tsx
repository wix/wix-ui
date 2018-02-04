import * as React from 'react';
import style from './DropdownOption.st.css';
import {Option} from './';

export interface DropdownOptionProps {
  className: string;
  option: Option;
  index: number;
  hoveredIndex: string | number;
  selectedIds: Array<string | number>;
  onClickHandler: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnterHandler: React.MouseEventHandler<HTMLDivElement>;
}

export const DropdownOption: React.SFC<DropdownOptionProps> = (props: DropdownOptionProps) => {
  const {option, index, hoveredIndex, selectedIds, onClickHandler, onMouseEnterHandler} = props;
  const disabled = option.isDisabled;
  const hovered = !disabled && hoveredIndex === index;
  const selected = !disabled && (selectedIds || []).includes(option.id);

  return (
    <div
      {...style('root', {disabled, hovered, selected}, props)}
      onClick={onClickHandler}
      onMouseEnter={onMouseEnterHandler}>
      {option.render()}
    </div>
  );
};
