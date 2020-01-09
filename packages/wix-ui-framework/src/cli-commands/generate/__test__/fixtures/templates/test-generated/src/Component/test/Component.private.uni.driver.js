import { {%componentName%}DriverFactory as publicDriverFactory } from '../{%ComponentName%}.uni.driver';

export const {%componentName%}PrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
