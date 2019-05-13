import { mapTree } from '.';

describe('mapTree', () => {
  describe('given object only', () => {
    it('should return original', () => {
      const fixture = { a: 1, b: { c: 2 } };
      expect(mapTree(fixture)).toEqual(fixture);
    });
  });

  describe('given object and map function', () => {
    it('should adjust the tree according to function', () => {
      const fixture = { a: 1, b: { c: 2 } };
      const fn = ({ key, value }) => {
        if (key === 'b') {
          return { bimbo: { cost: value.c * 400 } };
        }
      };

      expect(mapTree(fixture, fn)).toEqual({
        a: 1,
        bimbo: {
          cost: 800,
        },
      });
    });

    it('should deeply adjust the tree according to function', () => {
      const fixture = {
        a: 1,
        b: {
          c: 2,
          something: 'else',
          another: {
            level: {
              b: { c: 5 },
            },
          },
        },
      };

      const fn = ({ key, value }) => {
        if (key === 'b') {
          return { batman: { ...value, c: value.c * 2 } };
        }
      };

      expect(mapTree(fixture, fn)).toEqual({
        a: 1,
        batman: {
          c: 4,
          something: 'else',
          another: {
            level: {
              batman: { c: 10 },
            },
          },
        },
      });
    });

    it('should preserve value types and nested shape', () => {
      const baseFixture = {
        a: 1,
        b: '',
        c: '',
        d: false,
        e: null,
        f: '',
        g: '',
        removeMe: 'i should be removed',
      };

      const fixture = {
        ...baseFixture,
        nested: baseFixture,
      };

      const fn = ({ key, value }) => {
        if (key === 'b') {
          return 'this changes';
        }

        if (key === 'c') {
          return { iam: { an: 'object now' } };
        }

        if (key === 'f') {
          return {
            wowNewName: `wowNewValue${typeof value === 'string' ? value : ''}`,
          };
        }

        if (key === 'g') {
          return {
            againNew: 'multiple',
            andAgain: { nested: 'deep', f: ' from f key!' },
          };
        }

        if (key === 'removeMe') {
          return null;
        }
      };

      const result = mapTree(fixture, fn);

      expect(result).toEqual({
        a: 1,
        b: 'this changes',
        iam: { an: 'object now' },
        d: false,
        e: null,
        wowNewName: 'wowNewValue',
        againNew: 'multiple',
        andAgain: {
          nested: 'deep',
          wowNewName: 'wowNewValue from f key!',
        },
        nested: {
          a: 1,
          b: 'this changes',
          iam: { an: 'object now' },
          d: false,
          e: null,
          wowNewName: 'wowNewValue',
          againNew: 'multiple',
          andAgain: {
            nested: 'deep',
            wowNewName: 'wowNewValue from f key!',
          },
        },
      });
    });
  });
});
