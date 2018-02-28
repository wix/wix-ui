import {dropdownDriverFactory} from '../../baseComponents/Dropdown/Dropdown.driver';
import {inputDriverFactory} from '../../components/Input/Input.driver';

export const inputWithOptionsDriverFactory = (args) => {

  const inputDriver = inputDriverFactory({...args, element: args.element.querySelector('input')});
  const dropdownDriver = dropdownDriverFactory(args);

  return Object.assign(inputDriver, dropdownDriver, {});
};
