import {UniDriver} from 'unidriver';

export interface BaseUniDriver {
  /** returns true of component exists */
  exists: () => Promise<boolean>;
  /** click on the button root element */
  click: () => Promise<void>;
}

export const baseUniDriverFactory = (base: UniDriver): BaseUniDriver => {
  return {
    exists: async () => await base.exists(),
    click: async () => await base.click()
  };
};
