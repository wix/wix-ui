import style from './menu.st.css';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import {menuItemDriverFactory, MenuItemDriver} from '../menu-item/menu-item.driver';

import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';

import {UniDriver} from 'unidriver';

export interface MenuDriver extends BaseUniDriver {
  /** returns the items's driver at a given index */
  getItemAt: (number) => Promise<MenuItemDriver>;
  /** returns the number of items */
  itemsCount: () => Promise<number>;
  /** returns the selected item/s */
  getSelectedItem: () => Promise<any> | Promise<any>[];
  /** select the item at a given index */
  selectItemAt: (number) => Promise<void>;
  /** select the item with a given id */
  selectItemById: (number) => Promise<void>;
}

export const menuDriverFactory = (base: UniDriver): MenuDriver => {
  const stylableUtil = new StylableDOMUtil(style);
  const getItemAt = async index => 
    await menuItemDriverFactory(await base.$(`[data-hook="menu-item-${index}"]`));

  const getItems = async () => await base.$$(`[data-hook="menu-item]`)
  return {
    ...baseUniDriverFactory(base),
    getItemAt,
    itemsCount: async () => await (await getItems()).count(),
    getSelectedItem: async () => await stylableUtil.select(':selected'),
    selectItemAt: async index => await (await getItemAt(index)).click(),
    selectItemById: async id => {
      const items = await getItems();
      
      items
        .filter(async item => {
          const nativeItem = await item.getNative();
          const itemId = await nativeItem.attr('id');
          return id === itemId;
        })
        .map(async item => await item.click());
    }
  };
};
