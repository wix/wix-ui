// This file is copy of 'wix-ui-core/node_modules/protractor/built/index.d.ts'
// with fixes of protractor issue https://github.com/angular/protractor/issues/5348:
// error TS2440: Import declaration conflicts with local declaration of 'PluginConfig'.
// error TS2440: Import declaration conflicts with local declaration of 'ProtractorPlugin'.

import { ElementHelper, ProtractorBrowser } from 'protractor/built/browser';
import { ElementArrayFinder, ElementFinder } from 'protractor/built/element';
import { ProtractorExpectedConditions } from 'protractor/built/expectedConditions';
import { ProtractorBy } from 'protractor/built/locators';
import { Ptor } from 'protractor/built/ptor';
export { PluginConfig, ProtractorPlugin } from 'protractor/built/plugins';
export { ActionSequence, Browser, Builder, Button, Capabilities, Capability, error, EventEmitter, FileDetector, Key, logging, promise, Session, until, WebDriver, WebElement, WebElementPromise } from 'selenium-webdriver';
export { ElementHelper, ProtractorBrowser } from 'protractor/built/browser';
export { Config } from 'protractor/built/config';
export { ElementArrayFinder, ElementFinder } from 'protractor/built/element';
export { ProtractorExpectedConditions } from 'protractor/built/expectedConditions';
export { Locator, ProtractorBy } from 'protractor/built/locators';
export { Ptor } from 'protractor/built/ptor';
export { Runner } from 'protractor/built/runner';
export declare let utils: {
    firefox: any;
    http: any;
    remote: any;
};
export declare let Command: any;
export declare let CommandName: any;
export declare let protractor: Ptor;
export declare let browser: ProtractorBrowser;
export declare let $: (search: string) => ElementFinder;
export declare let $$: (search: string) => ElementArrayFinder;
export declare let element: ElementHelper;
export declare let By: ProtractorBy;
export declare let by: ProtractorBy;
export declare let ExpectedConditions: ProtractorExpectedConditions;

