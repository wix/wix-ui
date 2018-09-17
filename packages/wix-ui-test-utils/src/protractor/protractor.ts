import {$, ElementFinder} from 'protractor';
import {protractorUniDriver, UniDriver} from 'unidriver';

export function protractorTestkitFactoryCreator<T> (driverFactory: (e: ElementFinder) => T) {
  return (obj: {dataHook: string}) => driverFactory($(`[data-hook='${obj.dataHook}']`));
}

export function protractorUniTestkitFactoryCreator<T> (driverFactory: (base: UniDriver) => T) {
  return (obj: {dataHook: string}) => {
    const base = protractorUniDriver(() => ($(`[data-hook='${obj.dataHook}']`)));
    return driverFactory(base);
  };
}
