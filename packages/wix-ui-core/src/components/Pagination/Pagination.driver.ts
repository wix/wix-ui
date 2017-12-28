type NavButtonPlacement = 'top' | 'bottom' | 'inline' | 'nowhere';

export const paginationDriverFactory = ({element, eventTrigger}: {element: HTMLElement, eventTrigger: any}) => {
  const pages: Element = element.querySelector('[data-hook^="PAGES_SELECTION"]');

  const getNavButtonElement = (btnName: string): HTMLButtonElement => (
      <HTMLButtonElement> element.querySelector('[data-hook="' + btnName.toUpperCase() + '"]')
  );
  const getInput = (): HTMLInputElement | null => (<HTMLInputElement> element.querySelector('[data-hook="PAGE_INPUT"]'));

  const getNavButtonPlacement = (btnName: string): NavButtonPlacement => {
    const btn = getNavButtonElement(btnName);
    if (!btn) { return 'nowhere'; }

    switch (btn.parentElement.getAttribute('data-hook')) {
      case 'TOP_ROW': return 'top';
      case 'MIDDLE_ROW': return 'inline';
      case 'BOTTOM_ROW': return 'bottom';
      default: return 'nowhere';
    }
  };

  return {
    /** Returns whether the element exists */
    exists: (): boolean => !!element,
    /** The amount of pages displayed in "pages" mode */
    amountOfPages: pages ? pages.children.length : 0,
    /** Returns the text content of the displayed pages in "pages" mode */
    getPagesList: (): string[] => Array.from(pages.children).map(p => p.textContent),
    /** Returns the page element */
    getPage: (idx?: number): Element | null => (idx < pages.children.length) ? pages.children[idx] : null,
    /** Returns the page element currently selected */
    getCurrentPage: (): Element | null => element.querySelector('[data-isSelected="true"]'),
    /** Returns the element for the navigation button - acceptable values are 'first', 'last', 'previous' or 'next' */
    getNavButton: (btnName: string): { element: HTMLButtonElement, placement: NavButtonPlacement } => (
      {
        element: getNavButtonElement(btnName),
        placement: getNavButtonPlacement(btnName)
      }
    ),
    /** Simulates clicking a page in "pages" mode */
    clickOnPage: (idx: number): void => (idx < pages.children.length) && eventTrigger.click(pages.children[idx]),
    /** Simulates clicking a navigation button - acceptable values are 'first', 'last', 'previous' or 'next' */
    clickOnNavButton: (btnName: string): void => eventTrigger.click(getNavButtonElement(btnName)),
    /** Returns the page input element in "input" mode */
    getPageInput: getInput,
    /** Returns the total amount of pages displayed in "input" mode */
    getLastPageField: (): Element | null => element.querySelector('[data-hook="PAGES_TOTAL"]'),
    /** Simulates changing the value of the input field in "input" mode */
    changeInput: (newValue: string): void => {
      const input = getInput();
      input.value = newValue;
      eventTrigger.change(input);
    },
    /** Simulates keyDown on the input field in "input" mode */
    inputKeyDown: (keyCode: number): void => eventTrigger.keyDown(getInput(), {keyCode}),
    /** Simulates blur in the input field in "input" mode */
    inputBlur: (): void => eventTrigger.blur(getInput())
  };
};
