import { createValuesMap } from '../create-values-map';

describe('createValuesMap', () => {
  it('should add a `componentName` field based on `ComponentName`', () => {
    expect(
      createValuesMap({
        ComponentName: 'MyComponentName',
        description: '',
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
        description: '',
      }),
    ).toMatchObject({
      ComponentName: 'MyComponentName',
      'component-name': 'my-component-name',
    });
  });

  it('should use componentName as description, when description not provided', () => {
    const ComponentName = 'MyComponentName';
    expect(
      createValuesMap({
        ComponentName,
        description: '',
      }),
    ).toMatchObject({
      ComponentName,
      'component-name': 'my-component-name',
      description: ComponentName,
    });
  });
});
