import {dropdownDriverFactory} from '../../baseComponents/Dropdown/Dropdown.driver';
import {inputDriverFactory} from '../../components/Input/Input.driver';

export const inputWithOptionsDriverFactory = ({element, eventTrigger}) => {
  const inputDriver = inputDriverFactory({
    element: element.querySelector('[data-hook=input]'),
    eventTrigger
  });

  const dropdownDriver = dropdownDriverFactory({element, eventTrigger});

  return Object.assign({}, inputDriver, dropdownDriver);
};
