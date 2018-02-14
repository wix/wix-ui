import {ElementFinder} from 'wix-ui-test-utils/protractor';

export const dropdownContentDriverFactory = (component: ElementFinder) => {
  return {
    element: () => component,
    selectOption: async (index: number) => await component.$$('[data-hook="option"]').get(index).click()
  };
};
