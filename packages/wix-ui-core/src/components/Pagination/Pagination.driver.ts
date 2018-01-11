type NavButtonNames = 'first' | 'previous' | 'next' | 'last';

export const paginationDriverFactory = ({element: root, eventTrigger}: {element: HTMLElement, eventTrigger: any}) => {
  const pageStrip: Element = root.querySelector('[data-hook="page-strip"]');

  const getNavButtonElement = (btnName: string): HTMLButtonElement => (
      <HTMLButtonElement> root.querySelector('[data-hook="' + btnName + '"]')
  );
  const getInput = (): HTMLInputElement | null => (<HTMLInputElement> root.querySelector('[data-hook="page-input"]'));

  return {
    /** Returns the root element*/
    root,
    /** Returns whether the element exists */
    exists: (): boolean => !!root,
    /** Returns the container of page elements */
    getPageStrip: () => root.querySelector('[data-hook="page-strip"]'),
    /** Returns displayed page elements */
    getPages: () => Array.from(pageStrip.children),
    /** Returns the text content of the displayed pages in "pages" mode */
    getPageLabels: (): string[] => Array.from(pageStrip.children).map(p => p.textContent),
    /** Returns the page element given its index in the page strip */
    getPageByIndex: (idx?: number): Element | null => (idx < pageStrip.children.length) ? pageStrip.children[idx] : null,
    /** Returns the page element given page number */
    getPageByNumber: (n: number): Element | null => pageStrip.querySelector(`[data-hook~=page-${n}]`),
    /** Returns the page element currently selected */
    getCurrentPage: (): Element | null => root.querySelector('[data-hook~="current-page"]'),
    /** Returns the element for the navigation button - acceptable values are 'first', 'last', 'previous' or 'next' */
    getNavButton: (btnName: NavButtonNames): Element => getNavButtonElement(btnName),
    /** Simulates clicking a page in "pages" mode */
    click: (element: Element): void => eventTrigger.click(element),
    /** Simulates clicking a navigation button - acceptable values are 'first', 'last', 'previous' or 'next' */
    clickOnNavButton: (btnName: string): void => eventTrigger.click(getNavButtonElement(btnName)),
    /** Returns the page input element in "input" mode */
    getPageInput: getInput,
    /** Returns the total amount of pages displayed in "input" mode */
    getTotalPagesField: (): Element | null => root.querySelector('[data-hook="total-pages"]'),
    /** Simulates changing the value of the input field in "input" mode */
    changeInput: (newValue: string): void => {
      const input = getInput();
      input.value = newValue;
      eventTrigger.change(input);
    },
    /** Simulates keyDown on an element */
    keydown: (element: Element, eventData): void => eventTrigger.keyDown(element, eventData),
    /** Simulates keyDown on the input field in "input" mode */
    inputKeyDown: (keyCode: number): void => eventTrigger.keyDown(getInput(), {keyCode}),
    /** Simulates blur in the input field in "input" mode */
    inputBlur: (): void => eventTrigger.blur(getInput())
  };
};
