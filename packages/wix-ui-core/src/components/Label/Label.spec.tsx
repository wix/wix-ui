import * as React from 'react';
import {labelDriverFactory} from './Label.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Label} from './Label';

describe('Label', () => {
  const createDriver = createDriverFactory(labelDriverFactory);

  it('Renders with default values', async () => {
    const label = createDriver(<Label />);

    expect(label.exists()).toBe(true);
  });

  it('Renders children', async () => {
    const label = createDriver(<Label><div>HELLO</div></Label>);

    expect(label.getChildren()).toBe('<div>HELLO</div>');
  });

  it('takes an id prop', async () => {
    const label = createDriver(<Label id="hey" />);

    expect(label.getId()).toBe('hey');
  });

  it('takes an htmlFor prop', async () => {
    const label = createDriver(<Label for="hey" />);

    expect(label.getFor()).toBe('hey');
  });
});
