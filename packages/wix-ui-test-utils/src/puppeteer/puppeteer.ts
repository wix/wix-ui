import {Page, ElementHandle} from 'puppeteer';
import {BaseUniDriver} from '../base-driver';
import {UniDriver} from '@unidriver/core';
import {pupUniDriver} from '@unidriver/puppeteer';

export function puppeteerTestkitFactoryCreator<T>(
  driverFactory: (e: ElementHandle | null, page: Page) => T
) {
  return async (obj: { dataHook: string; page: Page }) =>
    driverFactory(await obj.page.$(`[data-hook='${obj.dataHook}']`), obj.page);
}

export interface Configs {
  dataHook?: string;
}

export function puppeteerUniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: (base: UniDriver, body: UniDriver, {  }: Configs) => T
) {
  return async (obj: { dataHook: string; page: Page }) => {
    const base = pupUniDriver({
      page: obj.page,
      selector: `[data-hook='${obj.dataHook}']`,
    });
    const body = pupUniDriver({page: obj.page, selector: 'body'});
    return driverFactory(base, body, {dataHook: obj.dataHook});
  };
}
