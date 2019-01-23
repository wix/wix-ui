import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import { UniDriver } from 'unidriver';
import {StylableUnidriverUtil} from '../../../test/StylableUnidriverUtil';
import styles from './button-next.st.css';

export interface ButtonNextDriver extends BaseUniDriver {
  /** returns button text */
  getButtonTextContent: () => Promise<string>;
  /** returns true if button disabled */
  isButtonDisabled: () => Promise<boolean>;
}

export const buttonNextDriverFactory = (base: UniDriver): ButtonNextDriver => {
  const stylableUtil = new StylableUnidriverUtil(styles);

  return {
    ...baseUniDriverFactory(base),
    getButtonTextContent: async () => await base.text(),
    isButtonDisabled: async () => {
      // Using stylable state and not html 'disabled' attribute, since if 'href' exists, then we don't pu the 'disabled' attribute.
      return await stylableUtil.hasStyleState(base, 'disabled');
    }
  };
};
