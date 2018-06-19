/* global describe expect it  */

import removeHOC from './remove-hoc';

describe('removeHOC() given', () => {
  const assertsAndExpectations = [
    ['', ''],
    ['how are you', 'how are you'],
    ['hey(there', 'hey(there'],
    ['hello', 'hello'],
    ['im)ok', 'im)ok'],
    ['hello(world)', 'world'],
    ['Hel+lo(world)', 'world'],
    ['hello(w o r l d)', 'w o r l d'],
    ['(hello)', 'hello']
  ];

  assertsAndExpectations.map(([assert, expectation]) =>
    it(
      `"${assert}" should return "${expectation}"`,
      () => expect(removeHOC(assert)).toEqual(expectation)
    )
  );
});
