import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const {%componentName%}DriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () =>
      base.$('[data-hook="{%component-name%}-count"]').text(),

    /** Click the button */
    clickButton: async () =>
      base.$('[data-hook="{%component-name%}-button"]').click(),

    /** Get the button's text */
    getButtonText: async () =>
      base.$('[data-hook="{%component-name%}-button"]').text(),
  };
};
