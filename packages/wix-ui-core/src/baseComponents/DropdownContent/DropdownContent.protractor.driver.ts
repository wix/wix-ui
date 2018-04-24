import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';
import {dropdownOptionDriverFactory, DropdownOptionDriver} from '../DropdownOption/DropdownOption.protractor.driver';

export interface DropdownContentDriver extends BaseDriver {
  getOptionsCount: () =>  Promise<number>;
  optionAt: (index: number) => DropdownOptionDriver;
}

export const dropdownContentDriverFactory: DriverFactory<DropdownContentDriver> = component => {
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
