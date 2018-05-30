import * as React from 'react';
import {Divider} from '../../components/Divider';
import {shape, string, number, func, bool, oneOfType, Requireable} from 'prop-types';
import style from './DropdownOption.st.css';
const uniqueId = require('lodash/uniqueId');

export const optionPropType = shape({
  id: oneOfType([string, number]).isRequired,
  isDisabled: bool,
  isSelectable: bool,
  value: string,
  render: func.isRequired
});

export interface Option {
  id: number | string;
  isDisabled: boolean;
  isSelectable: boolean;
  value: string;
  render: (value: React.ReactNode) => React.ReactNode;
}

const createOption = (option: Partial<Option> = null): Option =>
  Object.assign(
    {
      id: option && (option.id || option.id === 0) ? option.id : uniqueId('Option'),
      isDisabled: false,
      isSelectable: true,
      value: null,
      render: val => val
    },
    option
  );

const escapeRegExp = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const hightlightMatches = (option: Option, searchTerm: string): Option => {
  const re = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  const parts = option.value.split(re).map((part, i) =>
    i % 2 ? <mark className={style.highlight} key={i}>{part}</mark> : part
  );

  return createOption({
    id: option.id,
    isDisabled: option.isDisabled,
    isSelectable: option.isSelectable,
    value: option.value,
    render: () => option.render(parts)
  });
};

export type DividerArgs = {
  className: string;
  value: React.ReactNode;
};

export const OptionFactory = {
  create: createOption,
  createDivider({className, value}: Partial<DividerArgs> = {}): Option {
    return createOption({
      id: uniqueId('Divider'),
      isDisabled: false,
      isSelectable: false,
      render: value ? () => <Divider className={className}>{value}</Divider> : () => <Divider className={className}/>
    });
  },
  createHighlighted(option: Option, hightlightValue: string): Option {
    return option.value && hightlightValue ? hightlightMatches(option, hightlightValue) : option;
  }
};
