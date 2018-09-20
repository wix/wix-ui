import {$, ElementFinder} from 'protractor';
import {protractorUniDriver} from './protractor-adapter';
import {UniDriver} from 'unidriver';
import {BaseUniDriver} from '../driver-factory/createDriverFactory';

export function protractorTestkitFactoryCreator<T>(
  driverFactory: (e: ElementFinder) => T
) {
  return (obj: { dataHook: string; wrapper?: ElementFinder }) =>
    obj.wrapper
      ? driverFactory(obj.wrapper.$(`[data-hook='${obj.dataHook}']`))
      : driverFactory($(`[data-hook='${obj.dataHook}']`));
}

export function protractorUniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: (base: UniDriver) => T
) {
  return (obj: { dataHook: string }) => {
    const base = protractorUniDriver(
      async () => await $(`[data-hook='${obj.dataHook}']`)
    );
    return driverFactory(base);
  };
}
