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

  it('should render HorizontalMenuItem with children', async () => {
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
    expect(await item.attr('aria-expanded')).toEqual('false');
    expect(await item.attr('aria-haspopup')).toEqual('menu');
  });

  it('should render HorizontalMenuItem without children', async () => {
    const menuItem = {
      title: 'Columns Layout',
    };

    const { driver } = render(
      <HorizontalMenu>
        <HorizontalMenu.Item {...menuItem} />
      </HorizontalMenu>,
    );

    const item = await driver.getMenuItem(menuItem.title);
    expect(await item.exists()).toBeTruthy();
    expect(await item.attr('aria-expanded')).toBeFalsy();
    expect(await item.attr('aria-haspopup')).toBeFalsy();
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

    const columnsLayout = await driver.getMenuItemColumnsLayout(menuItem.title);
    expect(await item.attr('aria-expanded')).toEqual('false');
    expect(await columnsLayout.attr('data-opened')).toEqual('false');
    await driver.hoverMenuItem(menuItem.title);
    expect(await item.attr('aria-selected')).toEqual('true');
    expect(await item.attr('aria-expanded')).toEqual('true');
    expect(await columnsLayout.attr('data-opened')).toEqual('true');
  });

  it('should render divider between items if provided', async () => {
    const divider = <div data-hook="horizontal-menu-divider">-|-</div>;
    const itemsCount = 3;

    const menuItem = {
      title: 'Columns Layout',
    };

    const { driver } = render(
      <HorizontalMenu divider={divider}>
        {Array(itemsCount)
          .fill(0)
          .map((_, index) => (
            <HorizontalMenu.Item {...menuItem} key={index} />
          ))}
      </HorizontalMenu>,
    );

    const dividers = await driver.getElementsByDataHook(
      'horizontal-menu-divider',
    );
    const dividersCount = await dividers.count();
    const dividersText = await dividers.text();
    expect(dividersCount).toEqual(itemsCount - 1);
    expect(dividersText.every(item => item === '-|-')).toBeTruthy();
  });

  it('should render different expand icon on open/close states', async () => {
    const menuItem = {
      title: 'Columns Layout',
      expandIcon: ({ isOpen }: { isOpen: boolean }) => (
        <div data-hook="expand-icon" data-opened={isOpen} />
      ),
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

    const expandIcon = await driver.getElementByDataHook('expand-icon');
    expect(await expandIcon.attr('data-opened')).toEqual('false');
    await driver.hoverMenuItem(menuItem.title);
    expect(await expandIcon.attr('data-opened')).toEqual('true');
  });
});
