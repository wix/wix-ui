import { filterDataProps } from './filter-data-props';

describe('filterDataProps', () => {
  it('should return only data-* props', () => {
    const assert = {
      'data-hook': 'hook!',
      hello: null,
      0: 0,
      'dat-a': '',
      ' data-': '',
      'data-': '',
      data: { hook: '' },
      'data-data': 'hello!',
      'data-string-that-sets-some-size-for-example': 'yo',
    };

    const expectation = {
      'data-hook': 'hook!',
      'data-data': 'hello!',
      'data-string-that-sets-some-size-for-example': 'yo',
    };

    expect(filterDataProps(assert)).toEqual(expectation);
  });
});
