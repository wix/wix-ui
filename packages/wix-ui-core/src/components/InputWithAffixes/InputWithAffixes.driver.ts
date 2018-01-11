import {inputDriverFactory} from '../Input/Input.driver';

export const inputWithAffixesDriverFactory = (args) => {
  const inputDriver = inputDriverFactory(args);

  return Object.assign(inputDriver, {});
};
