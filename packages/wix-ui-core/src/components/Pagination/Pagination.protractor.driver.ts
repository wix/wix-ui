import {ElementFinder} from 'protractor';

export const paginationDriverFactory = (component: ElementFinder) => ({
  /** Returns the root element*/
  element: () => component,

  /** Returns x & y coordinates for the element found with data-hook */
  getElementLocation: async (dataHook): Promise<{x: number, y: number}> => component.$(`[data-hook="${dataHook}"]`).getLocation(),

  /** Returns width & height for the element found with data-hook */
  getElementSize: async (dataHook): Promise<{width: number, height: number}> => component.$(`[data-hook="${dataHook}"]`).getSize(),

  /** Get the text content of pages shown in "pages" mode  */
  getPageList: async (): Promise<string[]> => {
    const pages = component.$$('[data-hook="page-strip"] > :first-child > *');
    return pages.map<string>(p => p.getText());
  }
});
