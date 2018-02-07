export const toggleSwitchDriverFactory = ({componentInstance, element, eventTrigger}) => {
  const toggleSwitch = element.querySelector('input');

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
    getToggleIcon: () => element.querySelector('.toggleIcon'),
    /** Returns the id of the input component */
    getId: () => element.querySelector('input').getAttribute('id'),
    /** Returns the computed styles object of the root component */
    getRootStyles: () => window.getComputedStyle(element),
    /** Returns the computed styles object of the outer label component */
    getOuterLabelStyles: () => window.getComputedStyle(element.querySelector('.outerLabel')),
    /** Returns the computed styles object of the inner label component */
    getInnerLabelStyles: () => window.getComputedStyle(element.querySelector('.innerLabel')),
    /** Returns the computed styles object of the toggle icon component */
    getToggleIconStyles: () => window.getComputedStyle(element.querySelector('.toggleIcon')),
    /** Returns a boolean indicating whether the toggle switch is focused or not */
    isFocused: () => toggleSwitch === document.activeElement,
    /** Invokes the focus method on the toggle switch */
    focus: () => componentInstance.focus(),
    /** Invokes the blur method on the toggle switch */
    blur: () => componentInstance.blur(),

    /** returns elements innerHtml */
    styles: {
      /** returns elements display css property */
      getRootDisplay: () => window.getComputedStyle(element).display,
      /** returns elements border-radius css property */
      getBorderRadius: () => window.getComputedStyle(element.querySelector('.outerLabel')).borderRadius
    }
  };
};
