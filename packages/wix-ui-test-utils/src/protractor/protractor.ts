/**
 * We should put in this file utilities which are specific to Wix.
 */
import {$, ElementFinder} from 'protractor';

export function protractorTestkitFactoryCreator<T> (driverFactory: (e: ElementFinder) => T) {
  return (obj: {dataHook: string}) => driverFactory($(`[data-hook='${obj.dataHook}']`));
}

export function byDataHook({element, dataHook}: {element: ElementFinder, dataHook: string}) {
  const selector = `[data-hook='${dataHook}']`;
  if (element) {
    return element.$(selector);
  } else {
    return $(selector);
  }
}
