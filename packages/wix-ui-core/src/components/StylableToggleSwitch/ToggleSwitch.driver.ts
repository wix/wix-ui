import {StylableDOMUtil} from 'stylable/test-utils';
import style from './ToggleSwitch.st.css';

export const toggleSwitchDriverFactory = ({element, eventTrigger}) => {
  const checkbox = element.querySelector('input');
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** Checks if element exists */
    exists: () => !!element,
    /** Triggers change */
    click: () => {
      // jsdom doesn't simulate checkboxes well: checkbox.click() updates .checked even
      // if the component is controlled, it also doesn't generate onChange() and doesn't
      // respect .disabled
      if (!checkbox.disabled) {
        eventTrigger.change(checkbox);
      }
    },
    /** Returns a boolean indicating if the toggleSwitch is checked */
    isChecked: () => checkbox.checked,
    /** Returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled: () => checkbox.disabled,
    /** Returns the toggle icon inside the knob */
    getKnobIcon: () => element.querySelector(stylableDOMUtil.scopeSelector('.knobIcon')),
    /** Returns whether the toggle has an icon */
    hasKnobIcon: () => !!element.querySelector(stylableDOMUtil.scopeSelector('.knobIcon')),
    /** Returns the id of the input */
    getId: () => checkbox.id,
    /** Returns the tab index */
    getTabIndex: () => checkbox.tabIndex,
    /** Returns the computed styles object of the root component */
    getRootStyles: () => window.getComputedStyle(element),
    /** Returns the computed styles object of the track */
    getTrackStyles: () => window.getComputedStyle(element.querySelector(stylableDOMUtil.scopeSelector('.track'))),
    /** Returns the computed styles object of the knob */
    getKnobStyles: () => window.getComputedStyle(element.querySelector(stylableDOMUtil.scopeSelector('.knob'))),
    /** Returns the computed styles object of the knob icon */
    getKnobIconStyles: () => window.getComputedStyle(element.querySelector(stylableDOMUtil.scopeSelector('.knobIcon')))
  };
};
