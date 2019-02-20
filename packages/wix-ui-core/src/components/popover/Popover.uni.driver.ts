import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const popoverDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    getTargetElement: async () => {
      const element = await base.$('[data-hook="popover-element"]').getNative();
      return element;
    },

    getContentElement: async () => {
      const element = await base.$('[data-hook="popover-content"]').getNative();
      return element;
    },
  };
};
