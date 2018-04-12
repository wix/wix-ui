/**
 * We should put in this file utilities which are specific to Wix.
 */
import {$, ElementFinder} from 'protractor';

export function protractorTestkitFactoryCreator<T> (driverFactory: (e: ElementFinder) => T) {
  return (obj: {dataHook: string}) => driverFactory($(`[data-hook='${obj.dataHook}']`));
}

export function byDataHook({wrapper, dataHook}: {wrapper: ElementFinder, dataHook: string}) {
  const selector = `[data-hook='${dataHook}']`;
  if (wrapper) {
    return wrapper.$(selector);
  } else {
    return $(selector);
  }
}
