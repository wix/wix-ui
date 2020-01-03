import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  baseUniDriverFactory,
  BaseUniDriver,
} from 'wix-ui-test-utils/base-driver';

import { HORIZONTAL_MENU_METADATA } from './constants';

export interface HorizontalMenuDriver extends BaseUniDriver {
  getElementByDataHook(dataHook: string): UniDriver;

  /** Get main <nav> */
  getMenuNavigation(): UniDriver;

  /** Get main <ul> */
  getMenuContainer(): UniDriver;

  /** Get a menu item by label */
  getMenuItem(menuItemLabel: string): UniDriver;

  /** Click on menu item by label */
  clickMenuItem(menuItemLabel: string): Promise<void>;

  /** Hover a menu item by label */
  hoverMenuItem(menuItemLabel: string): Promise<void>;

  /** Get column layout by menu label */
  getMenuItemColumnsLayout(menuItemLabel: string): UniDriver;

  /** Get grid layout by menu label */
  getMenuItemGridLayout(menuItemLabel: string): UniDriver;
}

export const horizontalMenuUniDriverFactory = (base: UniDriver) => {
  const getMenuItemByLabel = (menuItemLabel: string) =>
    base.$(
      `[data-hook="${HORIZONTAL_MENU_METADATA.dataHooks.item}"][aria-label="${menuItemLabel}"]`,
    );

  return {
    ...baseUniDriverFactory(base),

    getElementByDataHook: async (dataHook: string) =>
      base.$(`[data-hook="${dataHook}"]`),

    /** Get main <nav> */
    getMenuNavigation: async () =>
      base.$(`[data-hook="${HORIZONTAL_MENU_METADATA.dataHooks.navigation}"]`),

    /** Get main <ul> */
    getMenuContainer: async () =>
      base.$(`[data-hook="${HORIZONTAL_MENU_METADATA.dataHooks.container}"]`),

    /** Get a menu item by label */
    getMenuItem: async (menuItemLabel: string) =>
      getMenuItemByLabel(menuItemLabel),

    /** Click on menu item by label */
    clickMenuItem: async (menuItemLabel: string) =>
      getMenuItemByLabel(menuItemLabel).click(),

    /** Hover a menu item by label */
    hoverMenuItem: async (menuItemLabel: string) =>
      getMenuItemByLabel(menuItemLabel).hover(),

    /** Get grid layout by menu label */
    getMenuItemGridLayout: async (menuItemLabel: string) =>
      base.$(
        `[data-hook="${HORIZONTAL_MENU_METADATA.dataHooks.item}"][aria-label="${menuItemLabel}"] [data-hook="${HORIZONTAL_MENU_METADATA.dataHooks.gridLayout}"]`,
      ),

    /** Get column layout by menu label */
    getMenuItemColumnsLayout: async (menuItemLabel: string) =>
      base.$(
        `[data-hook="${HORIZONTAL_MENU_METADATA.dataHooks.item}"][aria-label="${menuItemLabel}"] [data-hook="${HORIZONTAL_MENU_METADATA.dataHooks.columnsLayout}"]`,
      ),
  };
};
