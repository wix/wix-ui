import { UniDriver } from "unidriver";

export interface ButtonNextDriver {
  /** returns true if button exists */
  exists: () => Promise<boolean>;
  /** click on the button */
  click: () => Promise<void>;
  /** returns button text */
  getButtonTextContent: () => Promise<string>;
  /** returns true if button disabled */
  isButtonDisabled: () => Promise<any>;

  getAttribute: (atr: string) => Promise<string>;
}

export const buttonNextDriverFactory = (base: UniDriver): ButtonNextDriver => {
  return {
    exists: async () => await base.exists(),
    click: async () => await base.click(),
    getButtonTextContent: async () => await base.text(),
    isButtonDisabled: async () => !!(await base.attr("disabled")),
    getAttribute: async (atr: string) => await base.attr(atr)
  };
};
