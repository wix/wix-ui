/* global describe it expect Promise */

const invert = require('../invert');

describe('promise `invert`', () => {
  it('should resolve given rejected promise', () =>
    expect(invert(Promise.reject('my man'))).resolves.toEqual('my man'));

  it('should reject given resolved promise', () =>
    expect(invert(Promise.resolve('my lady'))).rejects.toEqual('my lady'));
});
