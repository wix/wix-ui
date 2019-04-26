import {$, ElementFinder} from 'protractor';
import {protractorUniDriver} from '@unidriver/protractor';
import {UniDriver} from '@unidriver/core';
import {BaseUniDriver} from '../base-driver';

export function protractorTestkitFactoryCreator<T>(
  driverFactory: (e: ElementFinder) => T
) {
  return (obj: { dataHook: string; wrapper?: ElementFinder }) =>
    obj.wrapper
      ? driverFactory(obj.wrapper.$(`[data-hook='${obj.dataHook}']`))
      : driverFactory($(`[data-hook='${obj.dataHook}']`));
}

export interface options {
  dataHook?: string;
}

export function protractorUniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: (base: UniDriver, body: UniDriver, {  }: options) => T
) {
  return (obj: { dataHook: string }) => {
    const base = protractorUniDriver(
      async () => await $(`[data-hook='${obj.dataHook}']`)
    );
    const body = protractorUniDriver(async () => await $('body'));
    return driverFactory(base, body, {dataHook: obj.dataHook});
  };
}
