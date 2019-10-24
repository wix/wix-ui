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
      title: 'Columns Layout',
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem}>
          <HorizontalMenu.Layout.Columns>
            <HorizontalMenu.Item title="Sample text" />
            <HorizontalMenu.Item title="Sample text" />
            <HorizontalMenu.Item title="Sample text" />
          </HorizontalMenu.Layout.Columns>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.title);
    expect(await item.exists()).toBeTruthy();
  });

  it('should show submenu on HorizontalMenuItem hover', async () => {
    const menuItem = {
      title: 'Columns Layout',
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem}>
          <HorizontalMenu.Layout.Columns>
            <HorizontalMenu.Item title="Sample1" />
            <HorizontalMenu.Item title="Sample2" />
            <HorizontalMenu.Item title="Sample3" />
          </HorizontalMenu.Layout.Columns>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.title);
    expect(await item.exists()).toBeTruthy();

    try {
      await driver.getMenuItemColumnsLayout(menuItem.title);
      expect(false).toBeTruthy();
    } catch (err) {}

    expect(await item.attr('aria-expanded')).toEqual('false');
    await driver.hoverMenuItem(menuItem.title);
    expect(await item.attr('aria-expanded')).toEqual('true');
  });
});
