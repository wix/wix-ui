const { optimizeSource } = require('../utils/optimizations');

describe('optimizations', () => {
  describe('optimizeSource', () => {
    it('should rewrite mergeDrivers to spread', () => {
      const sourceCode = 'return mergeDrivers(publicDriver, focusableDriver)';

      expect(optimizeSource(sourceCode)).toEqual('return {...publicDriver, ...focusableDriver}');
    });
  });
});
