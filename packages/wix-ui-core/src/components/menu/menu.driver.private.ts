/* global Promise */
import {UniDriver, UniDriverList} from 'unidriver';
import {menuDriverFactory as publicMenuDriver, MenuDriver} from './menu.driver';

export interface MenuPrivateDriver extends MenuDriver {
  /* return children for inspection */
  getText: () => Promise<string>;
  assertChildren: () => Promise<boolean>;
}

export const menuItemPrivateDriverFactory = (
  base: UniDriver
): MenuPrivateDriver => ({
  ...publicMenuDriver(base),
  getText: async () => await base.text(),
  assertChildren: async () => {
    const menuItems = await base.$$('[data-hook="menu-item"]');
    const allChildren = await base.$$('*');
    return await menuItems.count() === await allChildren.count()
  }
});
