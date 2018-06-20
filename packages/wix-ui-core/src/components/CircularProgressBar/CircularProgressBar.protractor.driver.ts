import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import { promise, ElementFinder, browser } from 'protractor';

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
  const elementTitle = (e: ElementFinder) => e.$('title').getAttribute('innerHTML');
  const progressIndication = () => findByDataHook('progress-indicator');
  const elementTitleNumberValue = (e: ElementFinder) => {
    return new promise.Promise<number>(async resolve => {
      resolve(
        (await elementTitle(e)).match(/\d+/g).map(Number)[0]
      )
    }
    );
  }

  return {
    element: () => element,
    exists: () => element.isPresent(),
    getValue: () => elementTitleNumberValue(foregroundArc()),
    progressIndicationValue: () => progressIndication().getText()
  };
};
