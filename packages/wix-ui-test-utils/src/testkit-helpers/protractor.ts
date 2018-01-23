import {$, ElementFinder} from 'protractor';

export function protractorTestkitFactoryCreator<T> (driverFactory: (e: ElementFinder) => T) {
  return (obj: {dataHook: string}) => driverFactory($(`[data-hook='${obj.dataHook}']`));
}
