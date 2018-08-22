import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface DropdownOptionDriver extends BaseDriver {
  click: () =>  Promise<void>;
  getText: () => Promise<string>;
}

export const dropdownOptionDriverFactory: DriverFactory<DropdownOptionDriver> = component => {
  return {
    element: () => component,
    click: async () => component.click(),
    getText: async () => component.getText()
  };
};
