import { driver as anotherDriver } from './driver2.js';

export const driver = () => ({
  method: () => {},
  methodWithArguments: (a, b, c) => {},
  nested: {
    method: () => {},
  },
  ...anotherDriver(),
});
