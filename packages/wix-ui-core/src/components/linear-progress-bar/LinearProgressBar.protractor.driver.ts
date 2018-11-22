import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import {promise, ElementFinder} from 'protractor';

export interface LinearProgressBarDriver extends BaseDriver {
  /** Returns true if the root element is present */
  exists: () => promise.Promise<boolean>;
  /** Get the foreground bar width */
  getForegroundBarWidth: () => promise.Promise<number>;
  /** Get the background bar width */
  getBackgroundBarWidth: () => promise.Promise<number>;
  /** Returns true if the progress indication element is displayed */
  isProgressIndicationDisplayed: () => promise.Promise<boolean>;
  /** Get the progress indication element value */
  progressIndicationValue: () => promise.Promise<string>;
}

export const linearProgressBarDriverFactory: DriverFactory<LinearProgressBarDriver> = element => {
  
  const findByDataHook = dataHook => element.$(`[data-hook="${dataHook}"]`);
  const foregroundBar = () => findByDataHook('progressbar-foreground');
  const backgroundBar = () => findByDataHook('progressbar-background');
  const getElementWidth = (e: ElementFinder) => e.getSize().then((size => size.width));
  const progressIndication = () => findByDataHook('progress-indicator');

  return {
    element: () => element,
    exists: () => element.isPresent(),
    getForegroundBarWidth: () => getElementWidth(foregroundBar()),
    getBackgroundBarWidth: () => getElementWidth(backgroundBar()),
    isProgressIndicationDisplayed: () => progressIndication().isPresent(),
    progressIndicationValue: () => progressIndication().getText()
  };
};
