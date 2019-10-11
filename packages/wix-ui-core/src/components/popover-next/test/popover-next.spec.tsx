import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import PopoverNext from '../popover-next';
import { popoverNextPrivateDriverFactory } from './popover-next.private.uni.driver';

describe('PopoverNext', () => {
  const render = createRendererWithUniDriver(
    popoverNextPrivateDriverFactory,
  );

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<PopoverNext />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const { driver } = render(<PopoverNext />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<PopoverNext buttonText='Press me' />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
