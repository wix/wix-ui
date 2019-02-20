import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { Simulate } from 'react-dom/test-utils';
import { popoverDriverFactory } from './Popover.driver';

export const testkit = base => {
  const byHook = hook => base.$(`[data-hook="${hook}"]`);
  const legacyDriver = async () =>
    popoverDriverFactory({
      element: await base.getNative(),
      eventTrigger: Simulate,
    });

  const getArrowElement = () =>
    base.$('[data-hook="popover-arrow"]').getNative();

  return {
    ...baseUniDriverFactory(base),
    getTargetElement: async () => byHook('popover-element').getNative(),

    getContentElement: async () =>
      base.$('[data-hook="popover-content"]').getNative(),

    /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
    isTargetElementExists: async () => byHook('popover-element').exists(),

    /** Returns `true` whether the content element (`<Popover.Content/>`) exists */
    isContentElementExists: async () => byHook('popover-content').exists(),

    mouseEnter: () => byHook('popover-element').hover(),

    mouseLeave: async () => (await legacyDriver()).mouseLeave(), // TODO: migrate missing methods to unidriver

    clickOutside: async () => (await legacyDriver()).clickOutside(), // TODO: migrate missing methods to unidriver

    getArrowOffset: async () => {
      const arrowElement = await getArrowElement();
      const style = (await arrowElement).style;
      console.error(style);
      const { top, left, right, bottom } = (await arrowElement).style._values;
      return { top, left, right, bottom };
    },
  };
};
