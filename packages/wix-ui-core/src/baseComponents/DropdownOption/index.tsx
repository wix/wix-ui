import * as React from 'react';
import * as uniqueId from 'lodash/uniqueId';
import Divider from '../../components/Divider';

export interface Option {
  id: number | string;
  isDisabled: boolean;
  isSelectable: boolean;
  render: () => React.ReactNode;
}

export enum OptionType {
  Simple
}

const createOption: Function = (
  id: number | string,
  isDisabled: boolean,
  isSelectable: boolean,
  render: () => React.ReactNode): Option => {
    return {
        id,
        isDisabled,
        isSelectable,
        render
      };
  };

export const OptionFactory = {
  create(
    id: number | string,
    isDisabled: boolean,
    isSelectable: boolean,
    value: any, type:
    OptionType = OptionType.Simple): Option {

    switch (type) {
      case OptionType.Simple:
      default:
        return createOption(
          id,
          isDisabled,
          isSelectable,
          () => <span>{value}</span>);
    }
  },
  createDivider(value: string = null): Option {
    return createOption(
      uniqueId('Divider'),
      false,
      false,
      () => <Divider>{value}</Divider>);
  }
};
