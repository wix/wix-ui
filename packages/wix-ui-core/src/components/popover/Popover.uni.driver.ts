import { CommonDriver } from './Popover.common.uni.driver';
import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { ReactBase, safeGetNative } from '../../../test/utils/unidriver';

export const testkit = (base: UniDriver, body: UniDriver) => {
  const byHook = (hook: string) => base.$(`[data-hook="${hook}"]`);
  const reactBase = ReactBase(base);
  const commonDriver = CommonDriver(base, body);

  return {
    ...baseUniDriverFactory(base),
    click: async () => byHook('popover-element').click(),
    getTargetElement: async () => safeGetNative(byHook('popover-element')),

    getPortalElement: async () =>
      safeGetNative(body.$('[data-hook="popover-portal"]')),

    /**
     * Returns the content element (`<Popover.Content/>`)
     * @returns null if element is not found
     */
    getContentElement: async () =>
      safeGetNative(await commonDriver.getContentElement()),

    /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
    isTargetElementExists: async () => byHook('popover-element').exists(),

    /** Returns `true` whether the content element (`<Popover.Content/>`) exists */
    isContentElementExists: async () =>
      (await commonDriver.getContentElement()).exists(),

    mouseEnter: () => base.hover(),

    mouseLeave: async () => reactBase.mouseLeave(),

    clickOutside: async () => {
      (await body.getNative()).ownerDocument.dispatchEvent(
        new Event('mousedown'),
      );
      (await body.getNative()).ownerDocument.dispatchEvent(
        new Event('mouseup'),
      );
    },
    getArrowOffset: async () => {
      const arrowElement = byHook('popover-arrow');
      return (await arrowElement.getNative()).style;
    },
  };
};
