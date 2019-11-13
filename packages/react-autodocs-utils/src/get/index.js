/**
 * helper function to retrieve deeply nested properties
 * cause i don't need lodash, it's easy enough to implement
 *
 * given
 *
 * object = {
 *   nested: {
 *     deeply: {
 *       array: [ 'first', { second: 'hello' } ]
 *     }
 *   }
 * }
 *
 * get(object)('nested.deeply.array.1.second') // <-- 'hello'
 */

// get -> Object a -> String -> a
const get = object => path =>
  path
    .split('.')
    .reduce(
      (resultObject, pathPart) => (resultObject && resultObject[pathPart] ? resultObject[pathPart] : null),
      object
    );

module.exports = get;
