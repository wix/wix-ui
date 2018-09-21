/* global Promise */
import {UniDriver} from 'unidriver';
import {
  menuItemDriverFactory as publicMenuItemDriver,
  MenuItemDriver
} from './menu-item.driver';

export interface MenuItemPrivateDriver extends MenuItemDriver {
  /* return children for inspection */
  getText: () => Promise<string>;
}

export const menuItemPrivateDriverFactory = (
  base: UniDriver
): MenuItemPrivateDriver => ({
  ...publicMenuItemDriver(base),
  getText: async () => await base.text()
});
