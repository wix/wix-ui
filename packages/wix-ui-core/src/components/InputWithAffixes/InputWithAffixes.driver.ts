import {inputDriverFactory} from '../Input/Input.driver';

export const inputWithAffixesDriverFactory = ({element, eventTrigger}) => {
  const inputDriver = inputDriverFactory({element, eventTrigger});
  const driver = {
    hasPrefix: () => !!element.querySelector('[data-hook="input-prefix"]'),
    getPrefix: () => element.querySelector('[data-hook="input-prefix"]'),
    hasSuffix: () => !!element.querySelector('[data-hook="input-suffix"]'),
    getSuffix: () => element.querySelector('[data-hook="input-suffix"]')
  };

  return Object.assign(inputDriver, driver);
};
