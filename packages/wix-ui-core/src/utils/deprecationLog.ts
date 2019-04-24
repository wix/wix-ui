export function unidriverDepLogWrapper(originalDriverFactory) {
  function driverFactory(base: any) {
    const driverName = originalDriverFactory.name;
    deprecationLog(
      `Deprecated import path: import {${driverName}} from 'wix-ui-core/drivers/vanilla'. ${driverName} is actually a UniDriver. Please import from 'wix-ui-core/drivers/unidriver'`,
    );
    originalDriverFactory(base);
  }
  return driverFactory;
}

export function deprecationLog(msg) {
  console.warn(`DEPRECATED wix-ui-core: ${msg}`);
}
