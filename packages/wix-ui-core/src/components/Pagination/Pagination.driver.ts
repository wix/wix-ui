import {Simulate} from 'react-dom/test-utils';

type NavButtonNames = 'first' | 'previous' | 'next' | 'last';

export const paginationDriverFactory = ({element}: {element: HTMLElement}) => {
  const pages: Element = element.querySelector('[data-hook^="PAGES_SELECTION"]');

  const getNavButtonElement = (btnName: NavButtonNames): HTMLButtonElement => (
      <HTMLButtonElement> element.querySelector('[data-hook="' + btnName.toUpperCase() + '"]')
  );
  const getInput = (): HTMLInputElement | null => (<HTMLInputElement> element.querySelector('[data-hook="PAGE_INPUT"]'));

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
    getNavButton: (btnName: NavButtonNames): HTMLButtonElement => getNavButtonElement(btnName),
    /** Simulates clicking a page in "pages" mode */
    clickOnPage: (idx: number): void => (idx < pages.children.length) && Simulate.click(pages.children[idx]),
    /** Simulates clicking a navigation button - acceptable values are 'first', 'last', 'previous' or 'next' */
    clickOnNavButton: (btnName: NavButtonNames): void => Simulate.click(getNavButtonElement(btnName)),
    /** Returns the page input element in "input" mode */
    getPageInput: getInput,
    /** Returns the total amount of pages displayed in "input" mode */
    getTotalPagesField: (): Element | null => element.querySelector('[data-hook="PAGES_TOTAL"]'),
    /** Simulates changing the value of the input field in "input" mode */
    changeInput: (newValue: string): void => {
      const input = getInput();
      input.value = newValue;
      Simulate.change(input);
    },
    /** Simulates keyDown on the input field in "input" mode */
    inputKeyDown: (keyCode: number): void => Simulate.keyDown(getInput(), {keyCode}),
    /** Simulates blur in the input field in "input" mode */
    inputBlur: (): void => Simulate.blur(getInput())
  };
};
