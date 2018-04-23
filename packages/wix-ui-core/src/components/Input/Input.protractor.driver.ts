import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface InputDriver extends BaseDriver {
  enterText: (text: string) => Promise<void>;
  focus: () => Promise<void>;
  getText: () => Promise<string>;
}

export const inputDriverFactory: DriverFactory<InputDriver> = component => {
  const input = component.$('input');

  return {
    element: () => component,
    enterText: async (text) => {
      await input.clear();
      await input.sendKeys(text);
    },
    focus: async () => input.click(),
    getText: async () => input.getAttribute('value')
  };
};
