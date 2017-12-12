import {Simulate} from 'react-dom/test-utils';

export const paginationDriverFactory = ({element}: {element: HTMLElement}) => {
  const pages: NodeListOf<HTMLElement> = element.querySelectorAll('[data-hook^="PAGE_"]') as NodeListOf<HTMLElement>;
  const selectedPage: number = parseInt(element.getAttribute('data-selected'), 10);
  
  const getButton = (btnName: string): HTMLButtonElement => (<HTMLButtonElement> element.querySelector('[data-hook="' + btnName.toUpperCase() + '"]'));
  const getInput = (): HTMLInputElement => (<HTMLInputElement> element.querySelector('[data-hook="PAGE_INPUT"]'));

  return {
    exists: (): boolean => !!element,
    getPages: (idx?: number): HTMLElement | NodeListOf<HTMLElement> => (typeof idx !== 'undefined') ? pages[idx] : pages,
    getCurrentPage: (): HTMLElement => pages[selectedPage - 1],
    getButton: getButton,
    clickOnPage: (idx: number): void => Simulate.click(pages[idx]),
    clickOnButton: (btnName: string): void => Simulate.click(getButton(btnName)),
    getPageInput: getInput,
    getLastPageField: (): HTMLElement => element.querySelector('[data-hook="PAGES_TOTAL"]') as HTMLElement,
    changeInput: (newValue: string): void => {
      const input = getInput();
      input.value = newValue;
      Simulate.change(input)
    },
    inputKeyCode: (keyCode: number): void => Simulate.keyDown(getInput(), {keyCode}),
    inputBlur: (): void => Simulate.blur(getInput())
  };
};
