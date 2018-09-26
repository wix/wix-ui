import {UniDriver} from 'unidriver';
import {menuDriverFactory as publicMenuDriver, MenuDriver} from './menu.driver';

export interface MenuPrivateDriver extends MenuDriver {
  getText: () => Promise<string>;

  /* return children for inspection */
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
    return (await menuItems.count()) === (await allChildren.count());
  }
});
