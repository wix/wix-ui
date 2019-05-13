import { mapTree } from '.';

describe('mapTree', () => {
  it('should be defined', () => {
    expect(typeof mapTree).toEqual('function');
  });

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

    it('should preserve value types', () => {
      const fixture = {
        a: 1,
        b: '',
        c: '',
        d: false,
        e: null,
        f: '',
        g: '',
      };

      const fixture2 = {
        ...fixture,
        nested: fixture,
      };

      const fn = ({ key, value }) => {
        if (key === 'b') {
          return 'this changes';
        }

        if (key === 'c') {
          return { iam: { an: 'object now' } };
        }

        if (key === 'f') {
          return { wowNewName: '' };
        }

        if (key === 'g') {
          return { againNew: '', andAgain: '' };
        }
      };

      const { c, f, g, ...fixture2NoChanged } = fixture;

      const result = mapTree(fixture2, fn);

      expect(result).toEqual({
        ...fixture2NoChanged,
        b: 'this changes',
        iam: { an: 'object now' },
        wowNewName: '',
        againNew: '',
        andAgain: '',
        nested: {
          ...fixture2NoChanged,
          iam: { an: 'object now' },
          b: 'this changes',
          wowNewName: '',
          againNew: '',
          andAgain: '',
        },
      });
    });
  });
});
