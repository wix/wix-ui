import {$, ElementFinder} from 'protractor';
import {protractorUniDriver, UniDriver} from 'unidriver';

export function protractorTestkitFactoryCreator<T> (driverFactory: (base: UniDriver) => T) {
  return (obj: {dataHook: string}) => protractorUniDriver(() => driverFactory($(`[data-hook='${obj.dataHook}']`)));
}
