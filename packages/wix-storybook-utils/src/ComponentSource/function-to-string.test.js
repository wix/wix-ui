/* global describe it expect */

import functionToString from './function-to-string';

describe('functionToString', () => {
  it('should be defined', () => {
    expect(typeof functionToString).toBe('function');
  });

  describe('given function as argument', () => {
    it('should convert to arrow function and return it', () => {
      function prop(arg) {
        return 'value' + arg;
      }

      expect(functionToString(prop)).toEqual('arg => "value" + arg');
    });

    it('should handle multiple arguments', () => {
      function prop(arg1, arg2, arg3) {
        const anything = 'hello';
        return arg1 + arg2 + arg3 + anything;
      }

      expect(functionToString(prop)).toEqual(`(arg1, arg2, arg3) => {
  const anything = "hello";
  return arg1 + arg2 + arg3 + anything;
}`);
    });

    it('should not do anything to arrow function', () => {
      const prop = arg => arg + 1;
      expect(functionToString(prop)).toEqual(prop);
    });

    it('should convert properties to shorthand if possible', () => {
      function prop(value) {
        /* eslint-disable */
        return setState({
          value: value
        });
        /* eslint-enable */
      }

      expect(functionToString(prop)).toEqual(`value => setState({
  value
})`);
    });
  });

  describe('given non function argument', () => {
    [
      0, 10, false, String('hello'), [], null, NaN, Infinity
    ].map(assert =>
      it(`which is ${assert} should return ${assert}`, () =>
        expect(functionToString(assert)).toEqual(assert)
      )
    );
  });
});
