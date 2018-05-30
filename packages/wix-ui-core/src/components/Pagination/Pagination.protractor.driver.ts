import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface PaginationDriver extends BaseDriver {
  /** Returns x & y coordinates for the element found with data-hook */
  getElementLocation: (dataHook: string) => Promise<{x: number, y: number}>;
  /** Returns width & height for the element found with data-hook */
  getElementSize: (dataHook: string) => Promise<{width: number, height: number}>;
  /** Get the text content of pages shown in "pages" mode  */
  getPageList: () => Promise<string[]>;
}

export const paginationDriverFactory: DriverFactory<PaginationDriver> = component => ({
  /** Returns the root element*/
  element: () => component,

  /** Returns x & y coordinates for the element found with data-hook */
  getElementLocation: async dataHook => component.$(`[data-hook="${dataHook}"]`).getLocation(),

  /** Returns width & height for the element found with data-hook */
  getElementSize: async dataHook => component.$(`[data-hook="${dataHook}"]`).getSize(),

  /** Get the text content of pages shown in "pages" mode  */
  getPageList: async (): Promise<string[]> => {
    const pages = component.$$('[data-hook="page-strip"] > :first-child > *');
    return pages.map<string>(p => p.getText());
  }
});
