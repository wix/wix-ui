import { {%componentName%}DriverFactory as publicDriverFactory } from '../{%component-name%}.uni.driver';

export const {%componentName%}PrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
