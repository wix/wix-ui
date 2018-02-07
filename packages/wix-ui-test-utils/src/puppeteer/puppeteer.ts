import {Page, ElementHandle} from 'puppeteer';

export function puppeteerTestkitFactoryCreator<T> (driverFactory: (e: ElementHandle | null, page: Page) => T) {
  return async (obj: {dataHook: string, page: Page}) => driverFactory(await obj.page.$(`[data-hook='${obj.dataHook}']`), obj.page);
}
