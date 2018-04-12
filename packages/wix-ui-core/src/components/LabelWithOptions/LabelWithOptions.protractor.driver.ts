import {ElementFinder} from 'protractor';
import {labelDriverFactory} from '../../components/Label/Label.protractor.driver';
import {dropdownDriverFactory} from '../../baseComponents/Dropdown/Dropdown.protractor.driver';

export const labelWithOptionsDriverFactory = (component: ElementFinder) => {
  const dropdownDriver = dropdownDriverFactory(component);
  const labelDriver = labelDriverFactory(dropdownDriver.getTargetElement().$('[data-hook=label]'));

  return Object.assign(
    {},
    dropdownDriver,
    labelDriver);

};
