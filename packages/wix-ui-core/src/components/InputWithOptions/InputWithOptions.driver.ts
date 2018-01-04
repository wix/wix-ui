import {dropdownDriverFactory} from '../Dropdown/Dropdown.driver';

export const inputWithOptionsDriverFactory = (args) => {
  const dropdownDriver = dropdownDriverFactory(args);

  return Object.assign(dropdownDriver, {});
};
