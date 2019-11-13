/* global describe it expect */

const get = require('./');

describe('get()', () => {
  it('should return function when called', () => {
    expect(typeof get()).toBe('function');
  });

  describe('given object path "descriptor"', () => {
    it('should return value', () => {
      const object = {
        nested: {
          deeply: {
            array: ['first', { second: 'hello' }],
          },
        },
      };

      const path = 'nested.deeply.array.1.second';
      expect(get(object)(path)).toEqual('hello');
    });
  });

  describe('given path "descriptor" pointing to non existing property', () => {
    it('should return null', () => {
      const object = {
        nested: {
          deeply: 'hello',
        },
      };

      const path = 'are.you.still.there.?';
      expect(get(object)(path)).toEqual(null);
    });
  });
});
