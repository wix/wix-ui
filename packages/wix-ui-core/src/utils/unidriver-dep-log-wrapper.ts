import { UniDriver } from 'wix-ui-test-utils/unidriver';
import deprecationLog from './deprecation-logger';

export function unidriverDepLogWrapper<T>(
  originalDriverFactory: (base: UniDriver) => T,
  driverFactoryName: string,
) {
  function driverFactory(base: UniDriver) {
    deprecationLog(
      `Deprecated import path: import {${driverFactoryName}} from 'wix-ui-core/drivers/vanilla'. ${driverFactoryName} is actually a UniDriver. Please import from 'wix-ui-core/drivers/unidriver'`,
    );
    return originalDriverFactory(base);
  }
  return driverFactory;
}
