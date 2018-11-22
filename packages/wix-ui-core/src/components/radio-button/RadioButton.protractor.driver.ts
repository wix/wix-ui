import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface RadioButtonDriver extends BaseDriver {
  select: () => Promise<void>;
  isSelected: () => Promise<boolean>;
}

export const radioButtonDriverFactory: DriverFactory<RadioButtonDriver> = component => ({
  element: () => component,
  select: async () => component.click(),
  isSelected: async () => {
    const checked = await component.getAttribute('aria-checked');
    return checked === 'true';
  }
});
