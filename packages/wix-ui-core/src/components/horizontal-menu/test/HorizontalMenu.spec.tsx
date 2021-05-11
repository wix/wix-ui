import * as React from 'react';

import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../../test/utils/react';
import { HorizontalMenu } from '../HorizontalMenu';
import { horizontalMenuPrivateDriverFactory } from './HorizontalMenu.private.uni.driver';
import { HorizontalMenuItemProps } from '../horizontal-menu-item';

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

  it('should render HorizontalMenuItem with children', async () => {
    const menuItem: HorizontalMenuItemProps = {
      label: 'Columns Layout',
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem}>
          <HorizontalMenu.Layout.Columns>
            <HorizontalMenu.Item label="Sample text" />
            <HorizontalMenu.Item label="Sample text" />
            <HorizontalMenu.Item label="Sample text" />
          </HorizontalMenu.Layout.Columns>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.label);
    expect(await item.exists()).toBeTruthy();
    expect(await item.attr('aria-expanded')).toEqual('false');
    expect(await item.attr('aria-haspopup')).toEqual('true');
  });

  it('should render HorizontalMenuItem without children', async () => {
    const menuItem: HorizontalMenuItemProps = {
      label: 'Columns Layout',
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem} />
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.label);
    expect(await item.exists()).toBeTruthy();
    expect(await item.attr('aria-expanded')).toBeFalsy();
    expect(await item.attr('aria-haspopup')).toEqual('false');
  });

  it('should show submenu on HorizontalMenuItem hover', async () => {
    const menuItem: HorizontalMenuItemProps = {
      label: 'Columns Layout',
      showDelay: 0,
      hideDelay: 0,
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem}>
          <HorizontalMenu.Layout.Columns>
            <HorizontalMenu.Item label="Sample1" />
            <HorizontalMenu.Item label="Sample2" />
            <HorizontalMenu.Item label="Sample3" />
          </HorizontalMenu.Layout.Columns>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.label);
    expect(await item.exists()).toBeTruthy();

    const columnsLayout = await driver.getMenuItemColumnsLayout(menuItem.label);
    expect(await item.attr('aria-expanded')).toEqual('false');
    expect(await columnsLayout.attr('data-opened')).toEqual('false');
    await driver.hoverMenuItem(menuItem.label);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(await item.attr('aria-selected')).toEqual('true');
    expect(await item.attr('aria-expanded')).toEqual('true');
    expect(await columnsLayout.attr('data-opened')).toEqual('true');
  });

  it('should render different expand icon on open/close states', async () => {
    const menuItem: HorizontalMenuItemProps = {
      label: 'Columns Layout',
      expandIcon: ({ isOpen }: { isOpen: boolean }) => (
        <div data-hook="expand-icon" data-opened={isOpen} />
      ),
      showDelay: 0,
      hideDelay: 0,
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem}>
          <HorizontalMenu.Layout.Columns>
            <HorizontalMenu.Item label="Sample1" />
            <HorizontalMenu.Item label="Sample2" />
            <HorizontalMenu.Item label="Sample3" />
          </HorizontalMenu.Layout.Columns>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const expandIcon = await driver.getElementByDataHook('expand-icon');
    expect(await expandIcon.attr('data-opened')).toEqual('false');
    await driver.hoverMenuItem(menuItem.label);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(await expandIcon.attr('data-opened')).toEqual('true');
  });

  it('should render icon if provided', async () => {
    const menuItem = {
      label: 'Columns Layout',
      icon: <div data-hook="menu-item-icon" />,
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem}>
          <HorizontalMenu.Layout.Columns>
            <HorizontalMenu.Item label="Sample1" />
            <HorizontalMenu.Item label="Sample2" />
            <HorizontalMenu.Item label="Sample3" />
          </HorizontalMenu.Layout.Columns>
        </HorizontalMenu.Item>
      </HorizontalMenu>,
    );

    const menuItemIcon = await driver.getElementByDataHook('menu-item-icon');
    expect(await menuItemIcon.exists()).toBeTruthy();
  });
});
