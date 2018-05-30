import {dropdownDriverFactory} from '../../baseComponents/Dropdown/Dropdown.driver';

export const iconWithOptionsDriverFactory = args => {
  const dropdownDriver = dropdownDriverFactory(args);

  return Object.assign(dropdownDriver, {});
};
