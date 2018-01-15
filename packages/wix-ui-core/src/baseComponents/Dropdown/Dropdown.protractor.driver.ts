import {dropdownContentTestkitFactory} from '../../testkit/protractor';

export const dropdownDriverFactory = component => {

  const getDropdownContentDriver = () => dropdownContentTestkitFactory({dataHook: 'dropdown-content'});

  return {
    element: () => component,
    selectOption: index => getDropdownContentDriver().selectOption(index)
  };
};
