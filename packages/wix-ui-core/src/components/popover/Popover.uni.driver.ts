import { CommonDriver } from './Popover.common.uni.driver';
import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'unidriver';
import { safeGetNative } from '../../../test/utils/unidriver';

export const testkit = (base: UniDriver, body: UniDriver) => {
  const byHook = (hook:string) => base.$(`[data-hook="${hook}"]`);
  const commonDriver = CommonDriver(base, body);

  return {
    ...baseUniDriverFactory(base),
    getTargetElement: async () => byHook('popover-element').getNative(),

    getPortalElement: async () =>
      (await body.getNative()).querySelector('[data-hook="popover-portal"]'),

    /** 
     * Returns the content element (`<Popover.Content/>`) 
     * @returns null if element is not found
     */
    getContentElement: async () => safeGetNative(await commonDriver.getContentElement()),
    
    /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
    isTargetElementExists: async () => byHook('popover-element').exists(),

    /** Returns `true` whether the content element (`<Popover.Content/>`) exists */
    isContentElementExists: async () => byHook('popover-content').exists(),

    mouseEnter: () => byHook('popover-element').hover(),

    mouseLeave: async () => Simulate.mouseLeave(await base.getNative()),

    clickOutside: async () =>
      (await body.getNative()).ownerDocument.dispatchEvent(
        new Event('mousedown'),
      ),

    getArrowOffset: async () => {
      const arrowElement = await byHook('popover-arrow');
      return (await arrowElement.getNative()).style;
    },
  };
};
