import {dropdownDriverFactory} from '../Dropdown/Dropdown.driver';

export const iconWithOptionsDriverFactory = (args) => {
  const dropdownDriver = dropdownDriverFactory(args);

  return Object.assign(dropdownDriver, {});
};
