/**
 * @deprecated
 * Importing directly from this file is deprecated. Please import from `wix-ui-test-utils/unidriver`.
 */

import {UniDriver} from '@unidriver/core';

export interface BaseUniDriver {
  /** returns true if component exists */
  exists: () => Promise<boolean>;
  /** returns the component element */
  element: () => Promise<any>;
  /** click on the element */
  click: () => Promise<void>;
}

export const baseUniDriverFactory = (base: UniDriver): BaseUniDriver => {
  return {
    exists: async () => await base.exists(),
    element: async () => await base.getNative(),
    click: async () => await base.click()
  };
};
