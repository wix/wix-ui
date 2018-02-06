import {Page, ElementHandle} from 'puppeteer';

export function puppeteerTestkitFactoryCreator<T> (driverFactory: (e: ElementHandle, page: Page) => T) {
  return async (obj: {dataHook: string, page: any}) => driverFactory(await obj.page.$(`[data-hook='${obj.dataHook}']`), obj.page);
}
