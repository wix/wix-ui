import {ElementFinder} from 'protractor';

export const radioButtonDriverFactory = (component: ElementFinder) => ({
  element: () => component,
  select: async () => component.click(),
  isSelected: async () => {
    const checked = await component.getAttribute('aria-checked');
    return checked === 'true';
  }
});
