import style from './menu-item.st.css';
import {StylableDOMUtil} from '@stylable/dom-test-kit';

import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';

import {UniDriver} from 'unidriver';

export interface MenuItemDriver extends BaseUniDriver {
  isSelected: () => Promise<boolean>;
  isHighlighted: () => Promise<boolean>;
  isDisabled: () => Promise<boolean>;
}

export const menuItemDriverFactory = (base: UniDriver): MenuItemDriver => {
  const stylableUtil = new StylableDOMUtil(style);
  const assertState = async state =>
    stylableUtil.hasStyleState(await base.getNative(), state);

  return {
    ...baseUniDriverFactory(base),
    isSelected: async () => await assertState('selected'),
    isHighlighted: async () => await assertState('highlighted'),
    isDisabled: async () => await assertState('disabled')
  };
};
