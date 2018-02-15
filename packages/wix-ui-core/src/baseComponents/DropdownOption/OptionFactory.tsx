import * as React from 'react';
import uniqueId = require('lodash.uniqueid');
import {Divider} from '../../components/Divider';
import {Highlighter} from '../Highlighter';

export interface Option {
  id: number | string;
  isDisabled: boolean;
  isSelectable: boolean;
  value: string;
  render: (value: React.ReactNode) => React.ReactNode;
}

const createOption = (
  id: number | string,
  isDisabled: boolean,
  isSelectable: boolean,
  value: string,
  render: (val: React.ReactNode) => React.ReactNode = val => val): Option => {
    return {
        id: (id || id === 0) ? id : uniqueId('Option'),
        isDisabled,
        isSelectable,
        value,
        render
      };
  };

const escapeRegExp = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
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
    () => option.render(parts)
  );
};

export const OptionFactory = {
  create: createOption,
  createDivider(value: string = ''): Option {
    return createOption(
      uniqueId('Divider'),
      false,
      false,
      '',
      value ? () => <Divider>{value}</Divider> : () => <Divider/>);
  },
  createCustomDivider(divider: React.ReactElement<any>): Option {
    return createOption(
      uniqueId('Divider'),
      false,
      false,
      '',
      () => divider);
  },
  createHighlighted(
    option: Option,
    hightlightValue: string): Option {
      return option.value && hightlightValue && option.render ? hightlightMatches(option, hightlightValue) : option;
    }
};
