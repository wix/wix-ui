import { UniDriver } from 'unidriver';

export interface BaseUniDriver {
  /** returns true if component exists */
  exists(): Promise<boolean>;
  /** returns the component element */
  element(): Promise<any>;
  /** click on the element */
  click(): Promise<void>;
}

export const baseUniDriverFactory = (base: UniDriver): BaseUniDriver => {
  return {
    exists: async () => base.exists(),
    element: async () => base.getNative(),
    click: async () => base.click(),
  };
};
