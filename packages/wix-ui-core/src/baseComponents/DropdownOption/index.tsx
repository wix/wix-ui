import * as React from 'react';
import * as uniqueId from 'lodash/uniqueId';
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
