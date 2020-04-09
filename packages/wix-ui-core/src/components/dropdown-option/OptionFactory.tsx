import * as React from 'react';
import { Divider } from '../../components/deprecated/divider';
import { classes } from './DropdownOption.st.css';
const uniqueId = require('lodash/uniqueId');
const compact = require('lodash/compact');

export interface Option {
  id: number | string;
  isDisabled: boolean;
  isSelectable: boolean;
  value: string;
  render(value: React.ReactNode): React.ReactNode;
}

const createOption = (option: Partial<Option> = null): Option => ({
  id: option && (option.id || option.id === 0) ? option.id : uniqueId('Option'),
  isDisabled: false,
  isSelectable: true,
  value: null,
  render: val => val,
  ...option,
});

const escapeRegExp = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const highlightRegExt = (s: string) =>
  new RegExp(`(${s.replace(/ /g, '|')})`, 'gi');
const isEven = i => i % 2 === 0;
const isOdd = i => i % 2 === 1;

const highlightMatches = (option: Option, searchTerm: string): Option => {
  const regExp = highlightRegExt(escapeRegExp(searchTerm.trim()));
  const stringArray = option.value.split(regExp);
  const f = stringArray[0] === '' ? isEven : isOdd;
  const parts = compact(stringArray).map((part, i) =>
    f(i) ? (
      <mark className={classes.highlight} key={i}>
        {part}
      </mark>
    ) : (
      <span className={classes.nonHighlight} key={i}>
        {part}
      </span>
    ),
  );

  return createOption({
    id: option.id,
    isDisabled: option.isDisabled,
    isSelectable: option.isSelectable,
    value: option.value,
    render: () => option.render(parts),
  });
};

export interface DividerArgs {
  className: string;
  value: React.ReactNode;
}

export const OptionFactory = {
  create: createOption,
  createDivider({ className, value }: Partial<DividerArgs> = {}): Option {
    return createOption({
      id: uniqueId('Divider'),
      isDisabled: false,
      isSelectable: false,
      render: value
        ? () => <Divider className={className}>{value}</Divider>
        : () => <Divider className={className} />,
    });
  },
  createHighlighted(option: Option, highlightValue: string): Option {
    return option.value && highlightValue
      ? highlightMatches(option, highlightValue)
      : option;
  },
};
