import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import {%ComponentName%} from '../{%ComponentName%}';
import { {%componentName%}PrivateDriverFactory } from './{%ComponentName%}.private.uni.driver';

describe('{%ComponentName%}', () => {
  const render = createRendererWithUniDriver(
    {%componentName%}PrivateDriverFactory,
  );

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<{%ComponentName%} />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const { driver } = render(<{%ComponentName%} />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<{%ComponentName%} buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
