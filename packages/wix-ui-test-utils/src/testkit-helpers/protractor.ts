import {$} from 'protractor';

export const protractorTestkitFactoryCreator = driverFactory =>
  ({dataHook}) => driverFactory($(`[data-hook='${dataHook}']`));
