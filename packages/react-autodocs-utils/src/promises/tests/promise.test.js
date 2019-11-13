/* global describe it expect */

const promise = require('../promise');

const success = (arg, callback) => setImmediate(() => callback(null, arg));

const failure = (arg, callback) => setImmediate(() => callback('oh no :('));

describe('Promise', () => {
  it('should be defined', () => {
    expect(typeof promise).toBe('function');
  });

  describe('when currying function and arguments', () => {
    it('should resolve promise when success', () => expect(promise(success)('hello')).resolves.toEqual('hello'));

    it('should reject promise when failure', () =>
      expect(promise(failure)("anything, doesn't matter")).rejects.toEqual('oh no :('));
  });
});
