const isObject = (o) => o && o.toString() === '[object Object]';

/**
 * mapTree is like Array.prototype.map but for objects
 * applies mapping function deeply
 * mapping function allows to change object greatly, so be careful
 *
 * @param input {object}
 * @param fn {function} ({ key: string, value: any, parent: object, path: string }) => any
 * @returns {object}
 * @example
 *
 * const mapped = mapTree({
 *  a: 1,
 *  b: {
 *    c: 2
 *  }
 * }, ({ key, value }) => {
 *   if (key === 'b') {
 *     return { batman: { ...value, c: value.c * 2 } }
 *   }
 * })
 *
 * console.log(mapped) // <=
 * {
 *   a: 1,
 *   batman: {
 *     c: 4
 *   }
 * }
 */

export const mapTree = (
  input: object,
  fn?: (a: { key: string; value: any; parent: object; path: string }) => any,
  path: string = '',
) =>
  typeof fn === 'function' && isObject(input)
    ? Object.keys(input).reduce((output, key) => {
        const candidate = fn({
          key,
          value: input[key],
          parent: input,
          path: path ? `${path}.${key}` : key,
        });

        const cases = [
          {
            when: () => candidate === null,
            make: () => ({}),
          },

          {
            when: () => isObject(candidate),
            make: () =>
              Object.keys(candidate).reduce(
                (o, k) => ({
                  ...o,
                  [k]: mapTree(candidate[k], fn, path ? `${path}.${k}` : k),
                }),
                {},
              ),
          },

          {
            when: () =>
              (!isObject(input[key]) || !isObject(candidate)) &&
              typeof candidate !== 'undefined',
            make: () => ({ [key]: candidate }),
          },

          {
            when: () => isObject(input[key]),
            make: () => ({
              [key]: mapTree(input[key], fn, path ? `${path}.${key}` : key),
            }),
          },

          {
            when: () => true,
            make: () => ({ [key]: input[key] }),
          },
        ];

        const spread = cases.find(({ when }) => when()).make();

        return {
          ...output,
          ...spread,
        };
      }, {})
    : input;
