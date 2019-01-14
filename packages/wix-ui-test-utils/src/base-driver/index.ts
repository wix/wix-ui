import {UniDriver} from 'unidriver';

export interface BaseUniDriver<T> {
  /** returns true if component exists */
  exists: () => Promise<boolean>;
  /** returns the component element */
  element: () => Promise<T>;
  /** click on the element */
  click: () => Promise<void>;
}

export const baseUniDriverFactory = (base: UniDriver): BaseUniDriver<Element> => {
  return {
    exists: async () => await base.exists(),
    element: async () => await base.getNative(),
    click: async () => await base.click()
  };
};
