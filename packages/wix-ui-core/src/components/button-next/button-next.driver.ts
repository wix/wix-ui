import { UniDriver } from "unidriver";

export interface ButtonNextDriver {
  /** returns true if button exists */
  exists: () => Promise<boolean>;
  /** click on the button */
  click: () => Promise<void>;
  /** returns button text */
  getTextContent: () => Promise<string>;
}

export const buttonNextDriver = (base: UniDriver): ButtonNextDriver => {
  return {
    exists: async () => await base.$("button").exists(),
    click: async () => await base.$("button").click(),
    getTextContent: async () => await base.$("button").text()
  };
};
