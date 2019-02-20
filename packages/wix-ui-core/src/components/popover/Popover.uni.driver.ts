import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const popoverDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    getTargetElement: async () => {
      const element = await base.$('[data-hook="popover-element"]');
      console.error('inner', base.getNative().innerHTML);
      console.error('element', JSON.stringify(element, null, 2));
      return element;
    },
  };
};
