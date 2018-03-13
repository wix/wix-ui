import {inputDriverFactory} from '../../components/Input/Input.protractor.driver';
import {dropdownDriverFactory} from '../Dropdown/Dropdown.protractor.driver';

export const inputWithOptionsDriverFactory = component => {
  const dropdownDriver = dropdownDriverFactory(component);
  const inputDriver = inputDriverFactory(dropdownDriver.getTargetElement().$('input'));

  return Object.assign(
    {},
    dropdownDriver,
    inputDriver);
};
