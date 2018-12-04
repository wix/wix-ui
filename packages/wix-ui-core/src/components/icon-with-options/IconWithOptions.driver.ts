import {dropdownDriverFactory} from '../dropdown/Dropdown.driver';

export const iconWithOptionsDriverFactory = args => {
  const dropdownDriver = dropdownDriverFactory(args);

  return Object.assign(dropdownDriver, {});
};
