import {ElementFinder} from 'protractor';

export const checkboxDriverFactory = (component: ElementFinder) => {
  const input = component.$('input');
  return {
    /** Returns the component instance */
    element: () => component,
    /** Simulates a click on the component */
    click: async () => component.click(),
    /** Indicates whether the component is disabled or not */
    isDisabled: async () => component.getAttribute('disabled').then(v => v !==  null),
    /** returns a boolean indicating if the checkbox is checked */
    isChecked: async () => input.isSelected(),
  };
};
