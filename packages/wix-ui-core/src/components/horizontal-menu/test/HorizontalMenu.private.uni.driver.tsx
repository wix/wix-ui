import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { horizontalMenuUniDriverFactory as publicDriverFactory } from '../HorizontalMenu.uni.driver';

export const horizontalMenuPrivateDriverFactory = (base: UniDriver) => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
