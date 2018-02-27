import {StylableDOMUtil} from 'stylable/test-utils';
import style from './ToggleSwitch.st.css';

export const toggleSwitchDriverFactory = ({element, eventTrigger}) => {
  const checkbox = element.querySelector('input');
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** triggers toggleSwitch change */
    click: () => {
      // jsdom doesn't simulate checkboxes well: checkbox.click() updates .checked even
      // if the component is controlled, it also doesn't generate onChange() and doesn't
      // respect .disabled
      if (!checkbox.disabled) {
        eventTrigger.change(checkbox);
      }
    },
    /** returns a boolean indicating if the toggleSwitch is checked */
    isChecked: () => checkbox.checked,
    /** returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled: () => checkbox.disabled,
    /** Returns the toggle icon inside the knob */
    getKnobIcon: () => element.querySelector(stylableDOMUtil.scopeSelector('.knobIcon')),
    /** Returns the id of the input component */
    getId: () => checkbox.id,
    getTabIndex: () => checkbox.tabIndex
  };
};
