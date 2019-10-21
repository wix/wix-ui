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
            <HorizontalMenu.Option text="Sample text" />
            <HorizontalMenu.Option text="Sample text" />
            <HorizontalMenu.Option text="Sample text" />
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
          <HorizontalMenu.Layout.Column style={{ maxHeight: '60px' }}>
            <HorizontalMenu.Option text="Sample1" />
            <HorizontalMenu.Option text="Sample2" />
            <HorizontalMenu.Option text="Sample3" />
          </HorizontalMenu.Layout.Column>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.title);
    expect(await item.exists()).toBeTruthy();

    try {
      await driver.getMenuItemSubmenu(menuItem.title);
      expect(false).toBeTruthy();
    } catch (err) {}

    await driver.hoverMenuItem(menuItem.title);
    const submenu = await driver.getMenuItemSubmenu(menuItem.title);
    expect(await submenu.exists()).toBeTruthy();
  });
});
