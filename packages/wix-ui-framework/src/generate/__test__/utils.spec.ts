import { isPascalCase, pascalToCamel, pascalToKebab } from '../utils';

describe('isPascalCase', () => {
  ['camelCase', 'snake-case', 'nocase', 'MaybeNumbers123'].map(assert =>
    it(`should return true for ${assert}`, () =>
      expect(isPascalCase(assert)).toBe(false)),
  );
});

describe('pascalToCamel', () => {
  [
    ['Component', 'component'],
    ['MyComponent', 'myComponent'],
    ['ABC', 'aBC'],
    ['ABc', 'aBc'],
    ['HelloWorld', 'helloWorld'],
  ].map(([assert, expectation]) =>
    it(`given ${assert} should return ${expectation}`, () =>
      expect(pascalToCamel(assert)).toEqual(expectation)),
  );
});

describe('pascalToKebab', () => {
  [
    ['Component', 'component'],
    ['MyComponent', 'my-component'],
    ['MyAwesomeComponent', 'my-awesome-component'],
    ['ABC', 'a-b-c'],
    ['aBC', 'a-b-c'],
    ['HelloWorld', 'hello-world'],
  ].map(([assert, expectation]) =>
    it(`given ${assert} should return ${expectation}`, () =>
      expect(pascalToKebab(assert)).toEqual(expectation)),
  );
});
