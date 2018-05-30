import {dropdownContentDriverFactory} from '../DropdownContent/DropdownContent.driver';
import {popoverDriverFactory} from '../../components/Popover/Popover.driver';

export const dropdownDriverFactory = args => {
  const dropdownContentDriver =  dropdownContentDriverFactory(args);
  const popoverDriver = popoverDriverFactory(args);

  return Object.assign({}, dropdownContentDriver, popoverDriver);
};
