import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const popoverDriverFactory = base => {
  const byHook = hook => base.$(`[data-hook="${hook}"]`);

  return {
    ...baseUniDriverFactory(base),
    getTargetElement: async () => byHook('popover-element').getNative(),

    getContentElement: async () =>
      base.$('[data-hook="popover-content"]').getNative(),

    /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
    isTargetElementExists: async () => byHook('popover-element').exists(),

    /** Returns `true` whether the content element (`<Popover.Content/>`) exists */
    isContentElementExists: async () => byHook('popover-content').exists(),
  };
};
