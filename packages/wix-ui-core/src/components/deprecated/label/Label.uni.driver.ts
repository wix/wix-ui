import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { StylableUnidriverUtil } from '../../../../test/StylableUnidriverUtil';
import styles from './Label.st.css';

export interface LabelDriver extends BaseUniDriver {
  /** get the label's text */
  getLabelText(): Promise<string>;
  /** get the id of the component */
  getId(): Promise<string>;
  /** get the "for" attribute of the component */
  getForAttribute(): Promise<string>;
  /** returns true if the label is in ellipsis state */
  hasEllipsis(): Promise<boolean>;
  /** true if disabled */
  isDisabled(): Promise<boolean>;
  /** send key down on the label */
  keyDown(key): Promise<void>;
}

export const labelUniDriverFactory = (base: UniDriver): LabelDriver => {
  const stylableUnidriverUtil = new StylableUnidriverUtil(styles);

  return {
    ...baseUniDriverFactory(base),
    getLabelText: () => base.text(),
    getId: () => base.attr('id'),
    getForAttribute: () => base.attr('for'),
    hasEllipsis: () => stylableUnidriverUtil.hasStyleState(base, 'ellipsis'),
    isDisabled: () => stylableUnidriverUtil.hasStyleState(base, 'disabled'),
    keyDown: key => base.pressKey(key),
  };
};
