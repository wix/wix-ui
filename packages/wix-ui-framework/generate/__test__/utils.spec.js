const utils = require('../utils');

describe('utils', () => {
  test('isPascalCase', () => {
    expect(utils.isPascalCase('camelCase')).toBe(false);
    expect(utils.isPascalCase('snake-case')).toBe(false);
    expect(utils.isPascalCase('nocase')).toBe(false);
    expect(utils.isPascalCase('MaybeNumbers123')).toBe(false);

    expect(utils.isPascalCase('Pascal')).toBe(true);
    expect(utils.isPascalCase('PascalCase')).toBe(true);
    expect(utils.isPascalCase('PCase')).toBe(true);
  });

  test('pascalToCamel', () => {
    expect(utils.pascalToCamel('Component')).toEqual('component');
    expect(utils.pascalToCamel('MyComponent')).toEqual('myComponent');
  });

  test('pascalToSnake', () => {
    expect(utils.pascalToSnake('Component')).toEqual('component');
    expect(utils.pascalToSnake('MyComponent')).toEqual('my-component');
    expect(utils.pascalToSnake('MyAwesomeComponent')).toEqual(
      'my-awesome-component',
    );
  });
});
