import {labelDriverFactory, LabelDriver} from '../../components/Label/Label.protractor.driver';
import {dropdownDriverFactory, DropdownDriver} from '../../baseComponents/Dropdown/Dropdown.protractor.driver';

import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface LabelWithOptionsDriver extends LabelDriver, DropdownDriver {
  isCheckboxModeOn: () => Promise<boolean>
}

export const labelWithOptionsDriverFactory: DriverFactory<LabelWithOptionsDriver> = component => {
  const dropdownDriver = dropdownDriverFactory(component);
  const labelDriver = labelDriverFactory(dropdownDriver.getTargetElement().$('[data-hook=label]'));

  const driver = {
    isCheckboxModeOn: async () => {
      await labelDriver.click();
      return component.$$('[data-hook=checkbox-option-container]').get(0).isPresent();
    }
  }

  return Object.assign(
    {},
    dropdownDriver,
    labelDriver,
    driver
  );

};
