import {inputTestkitFactory, dropdownTestkitFactory} from '../../testkit/protractor';

export const inputWithOptionsDriverFactory = component => {
  const inputDriver = inputTestkitFactory({dataHook: 'dropdown-input'});
  const getDropdownDriver = () => dropdownTestkitFactory({dataHook: 'dropdown'});

  return {
    element: () => component,
    focusInput: inputDriver.focus,
    enterText: inputDriver.enterText,
    getText: inputDriver.getText,
    selectOption: index => getDropdownDriver().selectOption(index)
  };
};
