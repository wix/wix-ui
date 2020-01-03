import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';

import { UniDriver } from 'wix-ui-test-utils/unidriver';

export interface MenuItemDriver extends BaseUniDriver {
  /** checks if the item is selected */
  isSelected(): Promise<boolean>;
  /** checks if the item is highlighted */
  isHighlighted(): Promise<boolean>;
  /** checks if the item is disabled */
  isDisabled(): Promise<boolean>;
  /** return children for inspection */
  getText(): Promise<string>;
}

export const menuItemDriverFactory = (base: UniDriver): MenuItemDriver => {
  return {
    ...baseUniDriverFactory(base),
    isSelected: async () => (await base.attr('data-selected')) === 'true',
    isHighlighted: async () => (await base.attr('data-highlighted')) === 'true',
    isDisabled: async () => (await base.attr('data-disabled')) === 'true',
    getText: async () => base.text(),
  };
};
