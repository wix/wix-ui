import * as React from 'react';

import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../../test/utils/react';
import { HorizontalMenu } from '../HorizontalMenu';
import { horizontalMenuPrivateDriverFactory } from './HorizontalMenu.private.uni.driver';

describe('HorizontalMenu', () => {
  const render = createRendererWithUniDriver(
    horizontalMenuPrivateDriverFactory,
  );

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<HorizontalMenu />);

    expect(await driver.exists()).toBeTruthy();
  });

  it('should render HorizontalMenuItem', async () => {
    const menuItem = {
      title: 'Column Layout',
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem}>
          <HorizontalMenu.Layout.Column>
            <HorizontalMenu.Item title="Sample text" />
            <HorizontalMenu.Item title="Sample text" />
            <HorizontalMenu.Item title="Sample text" />
          </HorizontalMenu.Layout.Column>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.title);
    expect(await item.exists()).toBeTruthy();
  });

  it('should show submenu on HorizontalMenuItem hover', async () => {
    const menuItem = {
      title: 'Column Layout',
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem}>
          <HorizontalMenu.Layout.Column>
            <HorizontalMenu.Item title="Sample1" />
            <HorizontalMenu.Item title="Sample2" />
            <HorizontalMenu.Item title="Sample3" />
          </HorizontalMenu.Layout.Column>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.title);
    expect(await item.exists()).toBeTruthy();

    try {
      await driver.getMenuItemColumnLayout(menuItem.title);
      expect(false).toBeTruthy();
    } catch (err) {}

    await driver.hoverMenuItem(menuItem.title);
    const submenu = await driver.getMenuItemColumnLayout(menuItem.title);
    expect(await submenu.exists()).toBeTruthy();
  });
});
