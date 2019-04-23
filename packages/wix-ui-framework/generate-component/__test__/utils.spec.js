const path = require('path');
const utils = require('../src/utils');

describe('utils', () => {
  test('getProjectRoot', () => {
    expect(utils.getProjectRoot()).toEqual(
      path.join(__dirname, '..', '..', '..'),
    );
  });

  test('isProjectRoot', () => {
    expect(utils.isProjectRoot(__dirname)).toBe(false);
    expect(utils.isProjectRoot(path.join(__dirname, '..', '..', '..'))).toBe(
      true,
    );
  });

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

  test('getComponentPath', () => {
    expect(utils.getComponentPath('MyComponent')).toEqual(
      path.join(__dirname, '..', '..', '..', 'src', 'MyComponent'),
    );
  });

  test('getComponentStoryPath', () => {
    expect(utils.getComponentStoryPath('MyComponent')).toEqual(
      path.join(__dirname, '..', '..', '..', 'stories', 'MyComponent'),
    );
  });

  test('getDestinationPath', () => {
    expect(utils.getDestinationPath('src/Component/index.js')).toEqual(
      path.join(__dirname, '..', '..', '..', 'src', 'Component', 'index.js'),
    );
  });
});
