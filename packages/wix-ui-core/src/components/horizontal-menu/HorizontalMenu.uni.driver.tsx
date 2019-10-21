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

  /** Get an option by text */
  getOption(optionText: string): Promise<UniDriver>;

  /** Click on option by text */
  clickOption(optionText: string): Promise<void>;

  /** Hover an option by text */
  hoverOption(optionText: string): Promise<void>;

  /** Get submenu by menu title */
  getMenuItemSubmenu(menuItemTitle: string): Promise<UniDriver>;
}

export const horizontalMenuDriverFactory = (base: UniDriver) => {
  const getMenuItemByTitle = (menuItemTitle: string) =>
    base.$(
      `[data-hook="horizontal-menu-item"][menu-item-title="${menuItemTitle}"]`,
    );

  const getOptionByText = (optionText: string) =>
    base.$(`[data-hook="horizontal-menu-option"][aria-label="${optionText}"]`);

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

    /** Get an option by text */
    getOption: async (optionText: string) => getOptionByText(optionText),

    /** Click on option by text */
    clickOption: async (optionText: string) =>
      getOptionByText(optionText).click(),

    /** Hover an option by text */
    hoverOption: async (optionText: string) =>
      getOptionByText(optionText).hover(),

    /** Get submenu by menu title */
    getMenuItemSubmenu: async (menuItemTitle: string) =>
      base.$(
        `[data-hook="horizontal-menu-item"][menu-item-title="${menuItemTitle}"] [data-hook="horizontal-menu-item-submenu"]`,
      ),
  };
};
