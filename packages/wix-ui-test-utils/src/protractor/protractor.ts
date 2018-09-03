import {$, ElementFinder} from 'protractor';

export function protractorTestkitFactoryCreator<T> (driverFactory: (e: ElementFinder) => T) {
  return (obj: {dataHook: string, wrapper?: ElementFinder}) => 
    wrapper ? driverFactory(wrapper.$(`[data-hook='${obj.dataHook}']`)) : driverFactory($(`[data-hook='${obj.dataHook}']`));
}
