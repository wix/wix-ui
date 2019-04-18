export function unidriverImportDepLog(driverName) {
  deprecationLog(
    `Deprecated import path: import {${driverName}} from 'wix-ui-core/drivers/vanilla'. ${driverName} is actually a UniDriver. Please import from 'wix-ui-core/drivers/unidriver'`,
  );
}

export function deprecationLog(msg) {
  console.warn(`DEPRECATED wix-ui-core: ${msg}`);
}
