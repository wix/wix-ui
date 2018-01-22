import {$, ElementFinder} from 'protractor';
import {Driver} from '../createDriverFactory';

export const protractorTestkitFactoryCreator = (driverFactory: (e: ElementFinder) => Driver) =>
  (obj: {dataHook: string}) => driverFactory($(`[data-hook='${obj.dataHook}']`));
