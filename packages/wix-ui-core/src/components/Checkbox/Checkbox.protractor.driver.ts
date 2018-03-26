import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './Checkbox.st.css';

export const checkboxDriverFactory = component => {
  const utils = new StylableDOMUtil(styles, component);
  // const hasStyleState = (state) => utils.hasStyleState(component, state);
  const input = utils.select('.nativeCheckbox') as HTMLInputElement;
  return {
    /** Returns the component instance */
    element: () => component,
    /** Simulates a click on the component */
    click: () => component.click(),
    /** Indicates whether the component is disabled or not */
    isDisabled: () => component.getAttribute('disabled') === '',
    /** Indicates whether the component is checked */
    isChecked: () => component.getAttribute('aria-checked') !== 'false'
  };
};
