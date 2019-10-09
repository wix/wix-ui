import {$, ElementFinder} from 'protractor';
import {protractorUniDriver} from '@unidriver/protractor';
import {UniDriver} from '@unidriver/core';
import {BaseUniDriver} from '../base-driver';

export function protractorTestkitFactoryCreator<T>(
  driverFactory: (
    wrapper: ElementFinder,
    body: ElementFinder,
    options: { dataHook: string }
  ) => T
) {
  return (obj: { dataHook: string; wrapper?: ElementFinder }) => {
    const wrapper =
      obj.wrapper && obj.wrapper.$(`[data-hook='${obj.dataHook}']`);
    const body = $('body');
    return wrapper
      ? driverFactory(wrapper, body, {
          dataHook: obj.dataHook,
        })
      : driverFactory(body.$(`[data-hook='${obj.dataHook}']`), body, {
          dataHook: obj.dataHook,
        });
  };
}

export function protractorUniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: (
    base: UniDriver,
    body: UniDriver,
    options: { dataHook: string }
  ) => T
) {
  return (obj: { dataHook: string }) => {
    const base = protractorUniDriver(
      async () => await $(`[data-hook='${obj.dataHook}']`)
    );
    const body = protractorUniDriver(async () => await $('body'));
    return driverFactory(base, body, {dataHook: obj.dataHook});
  };
}
