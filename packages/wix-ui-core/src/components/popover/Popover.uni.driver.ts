import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'unidriver';

import { popoverPrivateDriverFactory } from './Popover.private.driver';

export const testkit = (base: UniDriver, body: UniDriver) => {
  const byHook = hook => base.$(`[data-hook="${hook}"]`);
  const legacyDriver = async () =>
    popoverPrivateDriverFactory({
      element: await base.getNative(),
      eventTrigger: Simulate,
    });
  const getContentElement = async () =>
    (await body.getNative()).querySelector('[data-hook="popover-content"]');

  return {
    ...baseUniDriverFactory(base),
    getTargetElement: async () => byHook('popover-element').getNative(),

    getContentElement,

    getPortalElement: async () =>
      (await body.getNative()).querySelector('[data-hook="popover-portal"]'),

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

    clickOnContent: async () =>
      (await getContentElement()).dispatchEvent(new Event('mousedown')),

    getArrowOffset: async () => {
      const arrowElement = await byHook('popover-arrow');
      return (await arrowElement.getNative()).style;
    },
  };
};
