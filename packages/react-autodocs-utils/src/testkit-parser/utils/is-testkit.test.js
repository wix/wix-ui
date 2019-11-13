const isTestkit = require('./is-testkit');

describe('isTestkit', () => {
  [
    ['file.driver.js', true],
    ['file.protractor.driver.js', true],
    ['file.protractor.uni.driver.js', true],
    ['file.puppeteer.unidriver.private.driver.js', false],
    ['file.private.driver.js', false],
    ['file.private.uni.driver.js', false],
    ['index.js', false],
    ['file.js', false],
    ['driver.js', false],
  ].map(([assertion, expecation]) => {
    it(`should return ${expecation} for ${assertion}`, () => {
      expect(isTestkit(assertion)).toEqual(expecation);
    });
  });
});
