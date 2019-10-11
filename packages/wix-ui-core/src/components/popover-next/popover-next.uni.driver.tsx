import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const popoverNextDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () =>
      base.$('[data-hook="popover-next-count"]').text(),

    /** Click the button */
    clickButton: async () =>
      base.$('[data-hook="popover-next-button"]').click(),

    /** Get the button's text */
    getButtonText: async () =>
      base.$('[data-hook="popover-next-button"]').text(),
  };
};
