import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  baseUniDriverFactory,
  BaseUniDriver,
} from 'wix-ui-test-utils/base-driver';

export interface IHorizontalMenuUniDriver extends BaseUniDriver {
  /** Get main <nav> */
  getMenuNavigation(): Promise<UniDriver>;

  /** Get main <ul> */
  getMenuContainer(): Promise<UniDriver>;

  /** Get a menu item by title */
  getMenuItem(menuItemTitle: string): Promise<UniDriver>;

  /** Click on menu item by title */
  clickMenuItem(menuItemTitle: string): Promise<void>;

  /** Hover a menu item by title */
  hoverMenuItem(menuItemTitle: string): Promise<void>;

  /** Get column layout by menu title */
  getMenuItemColumnLayout(menuItemTitle: string): Promise<UniDriver>;

  /** Get grid layout by menu title */
  getMenuItemGridLayout(menuItemTitle: string): Promise<UniDriver>;
}

export const horizontalMenuDriverFactory = (base: UniDriver) => {
  const getMenuItemByTitle = (menuItemTitle: string) =>
    base.$(
      `[data-hook="horizontal-menu-item"][menu-item-title="${menuItemTitle}"]`,
    );

  return {
    ...baseUniDriverFactory(base),

    /** Get main <nav> */
    getMenuNavigation: async () =>
      base.$('[data-hook="horizontal-menu-navigation"]'),

    /** Get main <ul> */
    getMenuContainer: async () =>
      base.$('[data-hook="horizontal-menu-container"]'),

    /** Get a menu item by title */
    getMenuItem: async (menuItemTitle: string) =>
      getMenuItemByTitle(menuItemTitle),

    /** Click on menu item by title */
    clickMenuItem: async (menuItemTitle: string) =>
      getMenuItemByTitle(menuItemTitle).click(),

    /** Hover a menu item by title */
    hoverMenuItem: async (menuItemTitle: string) =>
      getMenuItemByTitle(menuItemTitle).hover(),

    /** Get grid layout by menu title */
    getMenuItemGridLayout: async (menuItemTitle: string) =>
      base.$(
        `[data-hook="horizontal-menu-item"][menu-item-title="${menuItemTitle}"] [data-hook="horizontal-menu-grid-layout"]`,
      ),

    /** Get column layout by menu title */
    getMenuItemColumnLayout: async (menuItemTitle: string) =>
      base.$(
        `[data-hook="horizontal-menu-item"][menu-item-title="${menuItemTitle}"] [data-hook="horizontal-menu-column-layout"]`,
      ),
  };
};
