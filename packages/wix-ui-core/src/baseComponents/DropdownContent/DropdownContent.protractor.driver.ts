import {ElementFinder, promise} from 'protractor';

export const dropdownContentDriverFactory = (component: ElementFinder) => {
  return {
    element: () => component,
    selectOption: (index: number) => component.$$('[data-hook="option"]').get(index).click()
  };
};
