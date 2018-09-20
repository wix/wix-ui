import {Page, ElementHandle} from 'puppeteer';
import {BaseUniDriver} from '../driver-factory/createDriverFactory';
import {UniDriver, pupUniDriver} from 'unidriver';

export function puppeteerTestkitFactoryCreator<T> (driverFactory: (e: ElementHandle | null, page: Page) => T) {
  return async (obj: {dataHook: string, page: Page}) => driverFactory(await obj.page.$(`[data-hook='${obj.dataHook}']`), obj.page);
}

export function puppeteerUniTestkitFactoryCreator<T extends BaseUniDriver> (driverFactory: (base: UniDriver) => T) {
  return async (obj: {dataHook: string, page: Page}) => {
    const base = pupUniDriver(await obj.page.$(`[data-hook='${obj.dataHook}']`), obj.page);
    return driverFactory(base);
  };
}
