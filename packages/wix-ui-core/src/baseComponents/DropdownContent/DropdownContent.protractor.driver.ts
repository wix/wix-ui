import {dropdownOptionDriverFactory} from '../DropdownOption/DropdownOption.protractor.driver';

export const dropdownContentDriverFactory = component => {
  const getOptions = () => component.$$('[data-hook="option"]');
  return {
    element: () => component,
    getOptionsCount: async () => await getOptions().count(),
    optionAt: (index: number) => {
      const option = getOptions().get(index);
      return dropdownOptionDriverFactory(option);
    }
  };
};
