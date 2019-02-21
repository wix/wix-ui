import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { Simulate } from 'react-dom/test-utils';
import { popoverPrivateDriverFactory } from './Popover.private.driver';

export const testkit = (base, body) => {
  const byHook = hook => base.$(`[data-hook="${hook}"]`);
  const legacyDriver = async () =>
    popoverPrivateDriverFactory({
      element: await base.getNative(),
      eventTrigger: Simulate,
    });

  return {
    ...baseUniDriverFactory(base),
    getTargetElement: async () => byHook('popover-element').getNative(),

    getContentElement: async () => (await legacyDriver()).getContentElement(),

    getPortalElement: async () => (await legacyDriver()).getPortalElement(),

    /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
    isTargetElementExists: async () => byHook('popover-element').exists(),

    /** Returns `true` whether the content element (`<Popover.Content/>`) exists */
    isContentElementExists: async () => byHook('popover-content').exists(),

    mouseEnter: () => byHook('popover-element').hover(),

    mouseLeave: async () => (await legacyDriver()).mouseLeave(), // TODO: migrate missing methods to unidriver

    clickOutside: async () =>
      (await body.getNative()).ownerDocument.dispatchEvent(
        new Event('mousedown'),
      ),

    clickOnContent: async () => (await legacyDriver()).clickOnContent(),

    getArrowOffset: async () => {
      const arrowElement = await byHook('popover-arrow');
      return (await arrowElement.getNative()).style;
    },
  };
};
