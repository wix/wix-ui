import {ElementFinder} from 'protractor';

import {popoverDriverFactory} from '../Popover/Popover.protractor.driver';
import {dropdownContentDriverFactory} from '../DropdownContent/DropdownContent.protractor.driver';

export const dropdownDriverFactory = (component: ElementFinder) => {
  const popoverDriver = popoverDriverFactory(component);

  return Object.assign(
    {},
    popoverDriver,
    {
      dropdownContent: () => dropdownContentDriverFactory(popoverDriver.getContentElement())
    });
  };
