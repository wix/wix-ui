// /// <reference path="../node_modules/@types/selenium-webdriver/index.d.ts" />

/*We need this line to make this a module, in order to allow augmenting the global scope */
export {};
import * as webdriver from 'selenium-webdriver';

declare global {
  // ElementArrayFinder

  namespace protractor {
    interface ElementArrayFinder {
      getByText(text: string): protractor.ElementFinder;
      $$data(hook: string): protractor.ElementArrayFinder;
    }

    interface ElementFinder {
      $data(hook: string): protractor.ElementFinder;
    }
  }

  // Globals

  function $data(hook: string): protractor.ElementFinder;
  function $$data(hook: string): protractor.ElementArrayFinder;

  // Locators

  // TODO - find out about result of querySelector and querySelector all.
  //        Are they Locator s?
  // namespace protractor {
  //   interface IProtractorLocatorStrategy {
  //     dataHook(hook: string, optParentElement?: protractor.ElementFinder, optRootSelector?: string) : webdriver.Locator;
  //     dataHookAll(hook: string, optParentElement?: protractor.ElementFinder, optRootSelector?: string) : webdriver.Locator;
  //   }
  // }

}
