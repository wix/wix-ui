import {UniDriver} from 'unidriver';
import {
  menuItemDriverFactory as publicMenuItemDriver,
  MenuItemDriver
} from './menu-item.driver';

export interface MenuItemPrivateDriver extends MenuItemDriver {}

export const menuItemPrivateDriverFactory = (
  base: UniDriver
): MenuItemPrivateDriver => {
  return {
    ...publicMenuItemDriver(base)
  };
};
