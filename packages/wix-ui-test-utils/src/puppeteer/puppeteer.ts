import {Page, ElementHandle} from 'puppeteer';
import {BaseUniDriver} from '../base-driver';
import {UniDriver} from '@unidriver/core';
import {pupUniDriver} from '@unidriver/puppeteer';

interface DriverFactoryOptions {
  dataHook: string;
}

/** @DEPRECATED please use `puppeteerUniTestkitFactoryCreator` */
export function puppeteerTestkitFactoryCreator<T>(
  driverFactory: (
    e: ElementHandle | null,
    page: Page,
    options: DriverFactoryOptions
  ) => T
) {
  return async (obj: { dataHook: string; page: Page }) =>
    driverFactory(await obj.page.$(`[data-hook='${obj.dataHook}']`), obj.page, {
      dataHook: obj.dataHook
    });
}

export function puppeteerUniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: (
    base: UniDriver,
    body: UniDriver,
    options: DriverFactoryOptions
  ) => T
) {
  return async (obj: {
    dataHook: string;
    page: Page;
    wrapper?: ElementHandle | null;
  }) => {
    const {wrapper: element} = obj; // destructuring `wrapper` so that type inference works well
    const selector = `[data-hook='${obj.dataHook}']`;
    const page = obj.page;

    const base = element
      ? pupUniDriver(async () => ({element, page, selector}))
      : pupUniDriver({page, selector});

    const body = pupUniDriver({page: obj.page, selector: 'body'});
    return driverFactory(base, body, {dataHook: obj.dataHook});
  };
}
