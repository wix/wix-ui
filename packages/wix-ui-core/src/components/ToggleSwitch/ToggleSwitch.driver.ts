import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const toggleSwitchDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;
  const toggleSwitch = element.querySelector('input');

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id} );
  }

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

    /** returns elements innerHtml */
    styles: {
      /** returns elements display css property */
      getRootDisplay: () => {
        return domTestkit.getCssValue({
          className: 'root',
          property: 'display'
        });
      },
      /** returns elements border-radius css property */
      getBorderRadius() {
        return domTestkit.getCssValue({
          className: 'innerLabel',
          property: 'border-radius'
        });
      }
    }
  };
};
