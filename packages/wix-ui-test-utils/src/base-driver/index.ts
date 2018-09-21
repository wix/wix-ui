import {UniDriver} from 'unidriver';

export interface BaseUniDriver {
  exists: () => Promise<boolean>;
  click: () => Promise<void>;
}

export const BaseUniDriverFactory = (base: UniDriver): BaseUniDriver => {
  return {
    exists: async () => await base.exists(),
    click: async () => await base.click()
  };
};
