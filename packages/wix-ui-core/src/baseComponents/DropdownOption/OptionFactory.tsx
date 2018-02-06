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

const escapeRegExp = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const hightlightMatches = (option: Option, searchTerm: string): Option => {
  const parts: Array<React.ReactNode> = option.value.split(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'));
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = <Highlighter key={i}>{parts[i]}</Highlighter>;
  }

  return createOption(
    option.id,
    option.isDisabled,
    option.isSelectable,
    option.value,
    () => parts
  );
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
          () => value
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
  createCustomDivider(divider: React.ReactElement<any>): Option {
    return createOption(
      uniqueId('Divider'),
      false,
      false,
      null,
      () => divider);
  },
  createHighlighted(
    option: Option,
    hightlightValue: string): Option {
      return option.value && hightlightValue ? hightlightMatches(option, hightlightValue) : option;
    }
};
