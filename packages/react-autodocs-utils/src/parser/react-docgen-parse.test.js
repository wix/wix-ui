/* global describe it expect jest */

const { reactDocgenParse } = require('./react-docgen-parse');

describe('reactDocgenParse', () => {
  describe('given source containing unknown component shape', () => {
    it('should return object with empty props key', () => {
      const source = 'export default 42;';
      expect(reactDocgenParse({ source })).toEqual({ props: {} });
    });
  });
});
