import {ElementFinder} from 'protractor';
import {dropdownOptionDriverFactory} from '../DropdownOption/DropdownOption.protractor.driver';

export const dropdownContentDriverFactory = (component: ElementFinder) => {
  const getOptions = () => component.$$('[data-hook="option"]');
  return {
    element: () => component,
    getOptionsCount: async () => getOptions().count(),
    optionAt: (index: number) => {
      const option = getOptions().get(index);
      return dropdownOptionDriverFactory(option);
    }
  };
};
