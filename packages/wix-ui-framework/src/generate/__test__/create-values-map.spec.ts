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
});
