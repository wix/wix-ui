import style from './menu-item.st.css';
import {StylableDOMUtil} from '@stylable/dom-test-kit';

import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';

import {UniDriver} from 'unidriver';

export interface MenuItemDriver extends BaseUniDriver {
  /** checks if the item is selected */
  isSelected: () => Promise<boolean>;
  /** checks if the item is highlighted */
  isHighlighted: () => Promise<boolean>;
  /** checks if the item is disabled */
  isDisabled: () => Promise<boolean>;
  /** return children for inspection */
  getText: () => Promise<string>;
}

export const menuItemDriverFactory = (base: UniDriver): MenuItemDriver => {
  const stylableUtil = new StylableDOMUtil(style);
  const assertState = async state =>
    stylableUtil.hasStyleState(await base.getNative(), state);

  return {
    ...baseUniDriverFactory(base),
    isSelected: async () => await assertState('selected'),
    isHighlighted: async () => await assertState('highlighted'),
    isDisabled: async () => await assertState('disabled'),
    getText: async () => await base.text(),
  };
};
