import * as React from 'react';
import * as uniqueId from 'lodash/uniqueId';
import style from './DropdownOption.st.css';
import {Divider} from '../../components/Divider';
import {Highlighter} from '../Highlighter';

export interface Option {
  id: number | string;
  isDisabled: boolean;
  isSelectable: boolean;
  value: string;
  render: () => React.ReactNode;
}

export enum OptionType {
  Simple
}

const createOption: Function = (
  id: number | string,
  isDisabled: boolean,
  isSelectable: boolean,
  value: string,
  render: () => React.ReactNode): Option => {
    return {
        id,
        isDisabled,
        isSelectable,
        value,
        render
      };
  };

const hightlightMatches = (value: string, searchTerm: string): Array<String | React.ReactNode> => {
  const hightlightString = value.replace(new RegExp(searchTerm, 'gi'), x => '<b>' + x + '</b>');
  const parts: Array<String | React.ReactNode> = hightlightString.split(/<b>|<\/b>/gi);
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = <Highlighter>{parts[i]}</Highlighter>;
  }
  return parts;
};

export const OptionFactory = {
  create(
    id: number | string,
    isDisabled: boolean,
    isSelectable: boolean,
    value: string,
    type: OptionType = OptionType.Simple): Option {

    switch (type) {
      case OptionType.Simple:
      default:
        return createOption(
          id,
          isDisabled,
          isSelectable,
          value,
          () => <span>{value}</span>
        );
    }
  },
  createDivider(value: string = null): Option {
    return createOption(
      uniqueId('Divider'),
      false,
      false,
      null,
      value ? () => <Divider>{value}</Divider> : () => <Divider/>);
  },
  createCustomDivider(divider: React.SFC): Option {
    return createOption(
      uniqueId('Divider'),
      false,
      false,
      null,
      divider);
  },
  createHighlighted(
    id: number | string,
    isDisabled: boolean,
    isSelectable: boolean,
    value: string,
    hightlightValue: string): Option {
    return createOption(
      id,
      isDisabled,
      isSelectable,
      value,
      () =>
        <span>
          {hightlightValue ? hightlightMatches(value, hightlightValue) : value}
        </span>);
  }
};

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
  </div>);
};
