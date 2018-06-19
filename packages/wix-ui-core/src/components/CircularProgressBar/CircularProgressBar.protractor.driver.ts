import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import {promise, ElementFinder} from 'protractor';

export interface CircularProgressBarDriver extends BaseDriver {
  /** Returns true if the root element is present */
  exists: () => promise.Promise<boolean>;
  /** Get the foreground arc value (percentage) */
  getArcValue: () => promise.Promise<string>;
  /** Returns true if the progress indication element is displayed */
  isProgressIndicationDisplayed: () => promise.Promise<boolean>;
  /** Get the progress indication element value */
  progressIndicationValue: () => promise.Promise<string>;
}

export const circularProgressBarDriverFactory: DriverFactory<CircularProgressBarDriver> = element => {

  const findByDataHook = dataHook => element.$(`[data-hook="${dataHook}"]`);
  const foregroundArc = () => findByDataHook('progressarc-foreground');
  const getElementAttribute = (e: ElementFinder, attr) => e.getAttribute(attr);
  const progressIndication = () => findByDataHook('progress-indicator');

  return {
    element: () => element,
    exists: () => element.isPresent(),
    getArcValue:  () => getElementAttribute(foregroundArc(), 'data-value'),
    isProgressIndicationDisplayed: () => progressIndication().isPresent(),
    progressIndicationValue: () => progressIndication().getText()
  };
};
