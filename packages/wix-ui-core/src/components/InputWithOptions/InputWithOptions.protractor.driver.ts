import {ElementFinder} from 'wix-ui-test-utils/protractor';
import {inputTestkitFactory, dropdownTestkitFactory} from '../../testkit/protractor';

export const inputWithOptionsDriverFactory = (component: ElementFinder) => {
  const inputDriver = inputTestkitFactory({dataHook: 'popover-element'});
  const getDropdownDriver = () => dropdownTestkitFactory({dataHook: 'dropdown'});

  return {
    element: () => component,
    focusInput: inputDriver.focus,
    enterText: inputDriver.enterText,
    getText: inputDriver.getText,
    selectOption: (index: number) => getDropdownDriver().selectOption(index)
  };
};
