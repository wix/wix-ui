const createValuesMap = require('../src/create-values-map');

describe('createValuesMap', () => {
  it('should add a `componentName` field based on `ComponentName`', () => {
    expect(
      createValuesMap({
        ComponentName: 'MyComponentName',
      }),
    ).toMatchObject({
      ComponentName: 'MyComponentName',
      componentName: 'myComponentName',
    });
  });

  it('should add a `component-name` field based on `ComponentName`', () => {
    expect(
      createValuesMap({
        ComponentName: 'MyComponentName',
      }),
    ).toMatchObject({
      ComponentName: 'MyComponentName',
      'component-name': 'my-component-name',
    });
  });
});
