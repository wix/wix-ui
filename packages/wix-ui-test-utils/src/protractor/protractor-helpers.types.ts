declare module '@wix/protractor-helpers' {
  import * as webdriver from 'selenium-webdriver';

  export function not(arg: webdriver.promise.IThenable<any>): webdriver.promise.IThenable<boolean>;

  // Copied definitions from angular-translate.
  export function translate(translationId: string, interpolateParams?: any): webdriver.promise.IThenable<string>;
  export function translate(translationId: string[], interpolateParams?: any): webdriver.promise.IThenable<{ [key: string]: string }>;

  export function safeGet(url: string): void;

  export function maximizeWindow(width?: number, height?: number): void; // TODO
  export function resetPosition(): void;
  export function moveToElement(hook: string): void;
  export function displayHover(element: protractor.ElementFinder): void;

  export function waitForElement(element: protractor.ElementFinder, timeout?: number): void;
  export function waitForElementToDisappear(element: protractor.ElementFinder, timeout?: number): void;

  export function selectOptionByText(select: protractor.ElementFinder, text: string): void;
  export function selectOptionByIndex(select: protractor.ElementFinder, index: number): void;

  export function selectOption(option: protractor.ElementFinder): void;

  export function isFirefox(): boolean;
  export function isIE(): boolean;

  export function createMessage(actual: string, message: string, isNot: any): string; // isNot : boolean too inflexible
  export function createMessage(actual: protractor.ElementFinder, message: string, isNot: any): string; // isNot : boolean too inflexible
  export function createMessage(actual: protractor.ElementArrayFinder, message: string, isNot: any): string; // isNot : boolean too inflexible

  export function clearAndSetValue(input: protractor.ElementFinder, value: string): void; // TODO - sendKeys(value)

  export function hasClass(element: protractor.ElementFinder, className: string): webdriver.promise.IThenable<boolean>;
  export function hasValue(element: protractor.ElementFinder, expectedValue: string): webdriver.promise.IThenable<boolean>;
  export function hasValue(element: protractor.ElementFinder, expectedValue: number): webdriver.promise.IThenable<boolean>;
  export function hasLink(element: protractor.ElementFinder, url: string): webdriver.promise.IThenable<boolean>;
  export function isDisabled(element: protractor.ElementFinder): webdriver.promise.IThenable<boolean>;
  export function isChecked(element: protractor.ElementFinder): webdriver.promise.IThenable<boolean>;
  export function getFilteredConsoleErrors(): webdriver.promise.IThenable<string[]>; // TODO - discuss handling in IE

}
