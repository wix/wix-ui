import * as React from 'react';
import * as uniqueId from 'lodash/uniqueId';
import {Divider} from '../../components/Divider';

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
          () => <span>{value}</span>);
    }
  },
  createDivider(value: string = null): Option {
    return createOption(
      uniqueId('Divider'),
      false,
      false,
      null,
      value ? () => <Divider>{value}</Divider> : () => <Divider/>);
  }
};
