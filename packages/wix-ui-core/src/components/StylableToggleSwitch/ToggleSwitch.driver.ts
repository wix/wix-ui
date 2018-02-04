import {StylableDOMUtil} from 'stylable/test-utils';
import style from './ToggleSwitch.st.css';

export const toggleSwitchDriverFactory = ({element, eventTrigger}) => {
  const toggleSwitch = element.querySelector('input');
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** triggers toggleSwitch change */
    click: () => {
      toggleSwitch.click();
      eventTrigger.change(toggleSwitch);
    },
    /** returns a boolean indicating if the toggleSwitch is checked */
    isChecked: () => toggleSwitch.checked,
    /** returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled: () => toggleSwitch.disabled,
    /** Returns the toggle icon inside the knob */
    getToggleIcon: () => element.querySelector(stylableDOMUtil.scopeSelector('.toggleIcon')),
    /** Returns the id of the input component */
    getId: () => element.querySelector('input').getAttribute('id'),
    /** Returns the computed styles object of the root component */
    getRootStyles: () => window.getComputedStyle(element),
    /** Returns the computed styles object of the outer label component */
    getOuterLabelStyles: () => window.getComputedStyle(element.querySelector(stylableDOMUtil.scopeSelector('.outerLabel'))),
    /** Returns the computed styles object of the inner label component */
    getInnerLabelStyles: () => window.getComputedStyle(element.querySelector(stylableDOMUtil.scopeSelector('.innerLabel'))),
    /** Returns the computed styles object of the toggle icon component */
    getToggleIconStyles: () => window.getComputedStyle(element.querySelector(stylableDOMUtil.scopeSelector('.toggleIcon'))),
  };
};
