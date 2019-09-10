import { flatten } from './flatten';

describe('flatten', () => {
  describe('given array of non-nested objects', () => {
    it('should return same shape array', () => {
      const assertion = [{ a: 1, type: 'unknown' }, { b: 2, type: 'unknown' }];
      expect(flatten(assertion)).toEqual(assertion);
    });
  });

  describe('given array of objects with type `object`', () => {
    it('should flatten `props` array', () => {
      const assertion = [
        { a: 1, type: 'unknown' },
        {
          type: 'object',
          props: [{ b: 2, type: 'unknown' }],
        },
      ];

      const expectation = [
        { a: 1, type: 'unknown' },
        { b: 2, type: 'unknown' },
      ];

      expect(flatten(assertion)).toEqual(expectation);
    });

    it('should concat `name` and key of nested `props` with dot', () => {
      const assertion = [
        {
          a: 1,
          type: 'unknown',
          name: 'first',
        },
        {
          name: 'second',
          type: 'object',
          props: [
            {
              name: 'nested',
              type: 'unknown',
              b: 2,
            },
          ],
        },
      ];

      const expectation = [
        { a: 1, type: 'unknown', name: 'first' },
        { b: 2, type: 'unknown', name: 'second.nested' },
      ];

      expect(flatten(assertion)).toEqual(expectation);
    });

    it('should work with deeply nested objects', () => {
      const assertion = [
        {
          a: 1,
          type: 'unknown',
          name: 'first',
        },
        {
          name: 'second',
          type: 'object',
          props: [
            {
              name: 'nested',
              type: 'unknown',
              b: 2,
            },
            {
              type: 'object',
              name: 'third',
              props: [
                {
                  name: 'wheel',
                  type: 'unknown',
                  c: 3,
                },
              ],
            },
            {
              name: 'sibling',
              type: 'unknown',
              d: 4,
            },
          ],
        },
      ];

      const expectation = [
        { a: 1, type: 'unknown', name: 'first' },
        { b: 2, type: 'unknown', name: 'second.nested' },
        { c: 3, type: 'unknown', name: 'second.third.wheel' },
        { d: 4, type: 'unknown', name: 'second.sibling' },
      ];

      expect(flatten(assertion)).toEqual(expectation);
    });
  });
});
