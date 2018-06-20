import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import {promise, ElementFinder} from 'protractor';
import { GlobalsNumber } from 'csstype';

export interface CircularProgressBarDriver extends BaseDriver {
  /** Returns true if the root element is present */
  exists: () => promise.Promise<boolean>;
  /** Get the foreground arc value (percentage) */
  getValue: () => promise.Promise<number>;
  /** Get the progress indication element value */
  progressIndicationValue: () => promise.Promise<string>;
}

export const circularProgressBarDriverFactory: DriverFactory<CircularProgressBarDriver> = element => {

  const findByDataHook = dataHook => element.$(`[data-hook="${dataHook}"]`);
  const foregroundArc = () => findByDataHook('progressarc-foreground');
  const getElementAttribute = (e: ElementFinder, attr) => e.getAttribute(attr);
  const progressIndication = () => findByDataHook('progress-indicator');
  const getElementIntAttribute = (e: ElementFinder, attr) => new promise.Promise<number>(async resolve => resolve(parseInt(await getElementAttribute(e, attr))));

  return {
    element: () => element,
    exists: () => element.isPresent(),
    getValue: () => getElementIntAttribute(foregroundArc(), 'data-value'),
    progressIndicationValue: () => progressIndication().getText()
  };
};
