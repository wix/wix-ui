import { UniDriver } from 'wix-ui-test-utils/unidriver';
import deprecationLog from './deprecation-logger';

export function unidriverDepLogWrapper<T>(
  originalDriverFactory: (base: UniDriver) => T,
) {
  function driverFactory(base: UniDriver) {
    const driverName = originalDriverFactory.name;

    deprecationLog(
      `Deprecated import path: import {${driverName}} from 'wix-ui-core/drivers/vanilla'. ${driverName} is actually a UniDriver. Please import from 'wix-ui-core/drivers/unidriver'`,
    );
    return originalDriverFactory(base);
  }
  return driverFactory;
}
