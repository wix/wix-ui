import {UniDriver} from 'unidriver';

export interface BaseUniDriver {
  /** returns true if component exists */
  exists: () => Promise<boolean>;
  /** click on the element */
  click: () => Promise<void>;
}

export const baseUniDriverFactory = (base: UniDriver): BaseUniDriver => {
  return {
    exists: async () => await base.exists(),
    click: async () => await base.click()
  };
};
