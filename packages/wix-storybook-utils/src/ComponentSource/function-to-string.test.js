/* global describe it expect */

import functionToString from './function-to-string';

describe('functionToString', () => {
  describe('given function as argument', () => {
    it('should convert to arrow function and return it', () => {
      /* tslint:disable */
      function prop(arg) {
        return "value" + arg;
      }
      /* tslint:enable */

      expect(functionToString(prop)).toEqual(`arg => "value" + arg`);
    });

    it('should handle multiple arguments', () => {
      /* tslint:disable */
      function prop(arg1, arg2, arg3) {
        const anything = "hello";
        return arg1 + arg2 + arg3 + anything;
      }
      /* tslint:enable */

      expect(functionToString(prop)).toEqual(`(arg1, arg2, arg3) => {
  const anything = "hello";
  return arg1 + arg2 + arg3 + anything;
}`);
    });

    it('should not do anything to arrow function', () => {
      /* tslint:disable */
      const prop = arg => arg + 1;
      /* tslint:enable */

      expect(functionToString(prop)).toEqual(`arg => arg + 1`);
    });

    it('should convert properties to shorthand if possible', () => {
      /* tslint:disable */
      function prop(value) {
        // intentional ignore
        // @ts-ignore
        return setState({
          value: value
        });
      }
      /* tslint:enable */

      expect(functionToString(prop)).toEqual(`value => setState({
  value
})`);
    });

    it('should work with FunctionExpression', () => {
      const obj = {
        functionExpression(argument1, argument2, ...rest) {
          return 'this is a method';
        },
      };

      expect(functionToString(obj.functionExpression)).toEqual(
        obj.functionExpression.toString(),
      );
    });
  });

  describe('given non function argument', () => {
    [0, 10, false, String('hello'), [], null, NaN, Infinity].map(assert =>
      it(`which is ${assert} should return ${assert}`, () =>
        expect(functionToString(assert)).toEqual(assert)),
    );
  });
});
