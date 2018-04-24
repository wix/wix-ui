import {ElementFinder} from 'protractor';

export interface BaseDriver {
  /** Get root element of the component */
  element: () => ElementFinder;
}

export declare type DriverFactory<T extends BaseDriver> = (element: ElementFinder) => T;
