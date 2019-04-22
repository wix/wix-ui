import style from './menu-item.st.css';
import { StylableDOMUtil } from '@stylable/dom-test-kit';

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
  const stylableUtil = new StylableDOMUtil(style);
  const assertState = async state =>
    stylableUtil.hasStyleState(await base.getNative(), state);

  return {
    ...baseUniDriverFactory(base),
    isSelected: async () => assertState('selected'),
    isHighlighted: async () => assertState('highlighted'),
    isDisabled: async () => assertState('disabled'),
    getText: async () => base.text(),
  };
};
