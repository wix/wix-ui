import {
  createDriverFactory, isClassExists, makeControlled, getStoryUrl, scrollToElement,
  waitForVisibilityOf, testkitFactoryCreator, isTestkitExists,
  isEnzymeTestkitExists, enzymeTestkitFactoryCreator, protractorTestkitFactoryCreator
} from '../src/index';

describe('exports', () => {
  const modules = {
    createDriverFactory,
    isClassExists,
    makeControlled,
    getStoryUrl,
    scrollToElement,
    waitForVisibilityOf,
    testkitFactoryCreator,
    isTestkitExists,
    isEnzymeTestkitExists,
    enzymeTestkitFactoryCreator,
    protractorTestkitFactoryCreator
  };

  Object.keys(modules).forEach(key =>
    it(`should export ${key}`, () =>
      expect(typeof modules[key]).toBe('function')
    )
  );
});
