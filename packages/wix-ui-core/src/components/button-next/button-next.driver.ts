import {
  BaseUniDriver,
  baseUniDriverFactory
} from "wix-ui-test-utils/base-driver";
import { UniDriver } from "unidriver";

export interface ButtonNextDriver extends BaseUniDriver {
  /** returns button text */
  getButtonTextContent: () => Promise<string>;
  /** returns true if button disabled */
  isButtonDisabled: () => Promise<any>;
}

export const buttonNextDriverFactory = (base: UniDriver): ButtonNextDriver => {
  return {
    ...baseUniDriverFactory(base),
    getButtonTextContent: async () => await base.text(),
    isButtonDisabled: async () => !!(await base.attr("disabled"))
  };
};
