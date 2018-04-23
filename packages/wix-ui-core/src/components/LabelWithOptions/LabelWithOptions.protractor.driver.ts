import {labelDriverFactory, LabelDriver} from '../../components/Label/Label.protractor.driver';
import {dropdownDriverFactory, DropdownDriver} from '../../baseComponents/Dropdown/Dropdown.protractor.driver';

import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface LabelWithOptionsDriver extends LabelDriver, DropdownDriver {}

export const labelWithOptionsDriverFactory: DriverFactory<LabelWithOptionsDriver> = component => {
  const dropdownDriver = dropdownDriverFactory(component);
  const labelDriver = labelDriverFactory(dropdownDriver.getTargetElement().$('[data-hook=label]'));

  return Object.assign(
    {},
    dropdownDriver,
    labelDriver);

};
