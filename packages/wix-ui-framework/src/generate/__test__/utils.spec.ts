import { isPascalCase, pascalToCamel, pascalToKebab } from '../utils';

describe('isPascalCase', () => {
  ['camelCase', 'snake-case', 'nocase', 'MaybeNumbers123'].map(assert =>
    it(`should return true for ${assert}`, () =>
      expect(isPascalCase(assert)).toBe(false)),
  );
});

describe('pascalToCamel', () => {
  [['Component', 'component'], ['MyComponent', 'myComponent']].map(
    ([assert, expectation]) =>
      it(`given ${assert} should return ${expectation}`, () =>
        expect(pascalToCamel(assert)).toEqual(expectation)),
  );
});

describe('pascalToKebab', () => {
  expect(pascalToKebab('Component')).toEqual('component');
  expect(pascalToKebab('MyComponent')).toEqual('my-component');
  expect(pascalToKebab('MyAwesomeComponent')).toEqual('my-awesome-component');
});
