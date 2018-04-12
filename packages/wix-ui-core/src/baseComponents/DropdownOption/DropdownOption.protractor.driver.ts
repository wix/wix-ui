import {ElementFinder} from 'protractor';

export const dropdownOptionDriverFactory = (component: ElementFinder) => {
  return {
    element: () => component,
    click: async () => component.click(),
    getText: async () => component.getText()
  };
};
