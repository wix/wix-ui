import {dropdownDriverFactory} from '../../baseComponents/Dropdown/Dropdown.driver';

export const inputWithOptionsDriverFactory = (args) => {
  const dropdownDriver = dropdownDriverFactory(args);

  return Object.assign(dropdownDriver, {});
};
