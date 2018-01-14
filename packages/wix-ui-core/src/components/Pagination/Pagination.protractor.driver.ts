export const paginationDriverFactory = component => ({
  /** Returns the root element*/
  element: () => component,

  /** Returns x & y coordinates for the element found with data-hook */
  getElementLocation: (dataHook): Promise<{x: number, y: number}> => component.$(`[data-hook="${dataHook}"]`).getLocation(),

  /** Returns width & height for the element found with data-hook */
  getElementSize: (dataHook): Promise<{width: number, height: number}> => component.$(`[data-hook="${dataHook}"]`).getSize(),

  /** Get the text content of pages shown in "pages" mode  */
  getPageList(): Promise<string[]> {
    const pages = component.$$('[data-hook="page-strip"] > *');
    return pages.map(p => p.getText());
  }
});
