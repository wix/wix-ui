import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './Pagination.st.css';

const utils = new StylableDOMUtil(styles);
const hasStyleState = (element, state) => utils.hasStyleState(element, state);

export type NavButtonName = 'first' | 'previous' | 'next' | 'last';

export const paginationDriverFactory = ({element: root, eventTrigger: simulate}) => {
  const pageStrip: Element = root.querySelector('[data-hook="page-strip"]');

  const getNavButton = (name: NavButtonName): Element | null => (
    root.querySelector(`[data-hook=${name}]`)
  );

  const getInput = (): HTMLInputElement | null => (
    <HTMLInputElement> root.querySelector('[data-hook="page-input"]')
  );

  const getPageByNumber = (n: number): Element | null => (
    pageStrip.firstElementChild.querySelector(`[data-hook~=page-${n}]`)
  );

  const getPageElements = () => Array.from(pageStrip.firstElementChild.children);

  return {
    /** Returns the root element*/
    root,
    /** Returns whether the element exists */
    exists: (): boolean => !!root,
    /** Simulates events */
    simulate,
    /** Returns the container of page elements */
    getPageStrip: () => root.querySelector('[data-hook="page-strip"]'),
    /** Returns displayed page elements */
    getPages: () => getPageElements(),
    /** Returns the text content of the displayed pages in "pages" mode */
    getPageLabels: (): string[] => getPageElements().map(p => p.textContent),
    /** Returns the page element given its index in the page strip */
    getPageByIndex: (idx?: number): Element | null => getPageElements()[idx] || null,
    /** Returns the page element given page number */
    getPageByNumber,
    /** Returns the page element currently selected */
    getCurrentPage: (): Element | null => root.querySelector('[data-hook~="current-page"]'),
    /** Returns the element for the navigation button - acceptable values are 'first', 'last', 'previous' or 'next' */
    getNavButton,
    /** Returns the page input element in "input" mode */
    getPageInput: getInput,
    /** Returns the total amount of pages displayed in "input" mode */
    getTotalPagesField: (): Element | null => root.querySelector('[data-hook="total-pages"]'),
    /** Simulates clicking a nav button */
    clickNavButton: (name: NavButtonName): void => simulate.click(getNavButton(name)),
    /** Simulates clicking a page in "pages" mode */
    clickPage: (page: number): void => simulate.click(getPageByNumber(page)),
    click: () => simulate.click(root),
    /** Simulates changing the value of the input field in "input" mode */
    changeInput: (newValue: string): void => {
      const input = getInput();
      input.value = newValue;
      simulate.change(input);
    },
    /** Simulates committing the input field value in "input" mode */
    commitInput: (): void => simulate.keyDown(getInput(), {keyCode: 13}),
    /** Simulates blur in the input field in "input" mode */
    blurInput: (): void => simulate.blur(getInput()),
    /** Checks if the input has an error */
    inputHasError: () => hasStyleState(root, 'error')
  };
};
