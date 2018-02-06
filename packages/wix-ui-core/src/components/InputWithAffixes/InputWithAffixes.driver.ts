import {inputDriverFactory} from '../Input/Input.driver';

export const inputWithAffixesDriverFactory = ({element, eventTrigger}) => {
  const inputElement = element.querySelector('[data-hook="input"]');
  const inputDriver = inputDriverFactory({element: inputElement, eventTrigger});
  const driver = {
    hasPrefix: () => !!element.querySelector('[data-hook="input-prefix"]'),
    getPrefix: () => element.querySelector('[data-hook="input-prefix"]'),
    hasSuffix: () => !!element.querySelector('[data-hook="input-suffix"]'),
    getSuffix: () => element.querySelector('[data-hook="input-suffix"]')
  };

  return Object.assign(inputDriver, driver);
};
