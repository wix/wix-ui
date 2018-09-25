import {Page, ElementHandle} from 'puppeteer';
import {BaseUniDriver} from '../driver-factory/createDriverFactory';
import {UniDriver} from 'unidriver';
import {pupUniDriver} from 'unidriver/dist/lib/puppeteer';
//TODO: change it to import {pupUniDriver} from 'unidriver/puppeteer';
// Waiting for https://github.com/wix-incubator/unidriver/pull/7 to be merged

export function puppeteerTestkitFactoryCreator<T> (driverFactory: (e: ElementHandle | null, page: Page) => T) {
  return async (obj: {dataHook: string, page: Page}) => driverFactory(await obj.page.$(`[data-hook='${obj.dataHook}']`), obj.page);
}

export function puppeteerUniTestkitFactoryCreator<T extends BaseUniDriver> (driverFactory: (base: UniDriver) => T) {
  return async (obj: {dataHook: string, page: Page}) => {
    const base = pupUniDriver(async () => await obj.page.$(`[data-hook='${obj.dataHook}']`));
    return driverFactory(base);
  };
}
