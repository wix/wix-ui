/* global describe it expect */

const isTypescript = require('./');

describe('isTypescript', () => {
  it('should be defined', () => {
    expect(typeof isTypescript).toBe('function');
  });

  const notTS = ['', 'thing', 'index.js', 'index', null, [], '.ts.index'];
  const isTS = ['index.ts', 'index.tsx', 'index.test.ts'];

  notTS.map(assert => it(`should return false given ${assert}`, () => expect(isTypescript(assert)).toBe(false)));

  isTS.map(assert => it(`should return true given ${assert}`, () => expect(isTypescript(assert)).toBe(true)));
});
