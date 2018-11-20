import {BaseDriver, DriverFactory} from '../../common/BaseDriver.protractor';
import {popoverDriverFactory, PopoverDriver} from '../popover/Popover.protractor.driver';
import {dropdownContentDriverFactory, DropdownContentDriver} from '../dropdown-content/DropdownContent.protractor.driver';

export interface DropdownDriver extends PopoverDriver {
  dropdownContent: () => DropdownContentDriver;
}

export const dropdownDriverFactory: DriverFactory<DropdownDriver> = component => {
  const popoverDriver: PopoverDriver = popoverDriverFactory(component);

  return Object.assign(
    {},
    popoverDriver,
    {
      dropdownContent: () => dropdownContentDriverFactory(popoverDriver.getContentElement())
    });
  };
