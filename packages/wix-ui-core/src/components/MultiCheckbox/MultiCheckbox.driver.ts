import {inputWithOptionsDriverFactory} from '../InputWithOptions/InputWithOptions.driver';

export const multiCheckboxDriverFactory = (args) => {
  const inputWithOptionsDriver = inputWithOptionsDriverFactory(args);

  return Object.assign(inputWithOptionsDriver, {});
};
