/* global describe it expect Promise */

const first = require('../first');

describe('promise `first`', () => {
  it('should resolve with first resolved value', () => expect(first([Promise.resolve('hey')])).resolves.toEqual('hey'));

  it('should resolve with first even when multiple', () =>
    expect(first([Promise.resolve('first'), Promise.resolve('second')])).resolves.toEqual('first'));

  it('should ignore rejected', () =>
    expect(
      first([Promise.reject('first'), Promise.reject('second'), Promise.resolve('third'), Promise.reject('fourth')])
    ).resolves.toEqual('third'));
});
