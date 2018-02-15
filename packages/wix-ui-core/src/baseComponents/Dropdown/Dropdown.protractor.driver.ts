import {ElementFinder} from 'wix-ui-test-utils/protractor';
import {dropdownContentTestkitFactory} from '../../testkit/protractor';

export const dropdownDriverFactory = (component: ElementFinder) => {

  const getDropdownContentDriver = () => dropdownContentTestkitFactory({dataHook: 'dropdown-content'});

  return {
    element: () => component,
    selectOption: (index: number) => getDropdownContentDriver().selectOption(index)
  };
};
