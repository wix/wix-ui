import {ElementFinder} from 'protractor';

export const inputDriverFactory = (component: ElementFinder) => {
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
