import { flatten } from './flatten';

describe('flatten', () => {
  it('should be defined', () => {
    expect(typeof flatten).toEqual('function');
  });

  describe('given array of non-nested objects', () => {
    it('should return same shape array', () => {
      const assertion = [{ a: 1 }, { b: 2 }];
      expect(flatten(assertion)).toEqual(assertion);
    });
  });

  describe('given array of objects with type `object`', () => {
    it('should flatten `props` array', () => {
      const assertion = [
        { a: 1 },
        {
          type: 'object',
          props: [{ b: 2 }],
        },
      ];

      const expectation = [{ a: 1 }, { b: 2 }];

      expect(flatten(assertion)).toEqual(expectation);
    });

    it('should concat `name` and key of nested `props` with dot', () => {
      const assertion = [
        {
          a: 1,
          name: 'first',
        },
        {
          name: 'second',
          type: 'object',
          props: [
            {
              name: 'nested',
              b: 2,
            },
          ],
        },
      ];

      const expectation = [
        { a: 1, name: 'first' },
        { b: 2, name: 'second.nested' },
      ];

      expect(flatten(assertion)).toEqual(expectation);
    });

    it('should work with deeply nested objects', () => {
      const assertion = [
        {
          a: 1,
          name: 'first',
        },
        {
          name: 'second',
          type: 'object',
          props: [
            {
              name: 'nested',
              b: 2,
            },
            {
              type: 'object',
              name: 'third',
              props: [
                {
                  name: 'wheel',
                  c: 3,
                },
              ],
            },
            {
              name: 'sibling',
              d: 4,
            },
          ],
        },
      ];

      const expectation = [
        { a: 1, name: 'first' },
        { b: 2, name: 'second.nested' },
        { c: 3, name: 'second.third.wheel' },
        { d: 4, name: 'second.sibling' },
      ];

      expect(flatten(assertion)).toEqual(expectation);
    });
  });
});
