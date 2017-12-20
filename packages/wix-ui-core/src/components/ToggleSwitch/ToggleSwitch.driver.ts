import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const toggleSwitchDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;
  const toggleSwitch = element.querySelector('input');

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id} );
  }

  return {
    /** exists method - checks if element exists */
    exists: () => !!element,
    /** click method - triggers toggleSwitch change */
    click: () => eventTrigger.change(toggleSwitch),
    /** isChecked method - returns a boolean indicating if the toggleSwitch is checked */
    isChecked: () => toggleSwitch.checked,
    /** isDisabled method - returns a boolean indicating if the toggleSwitch is disabled */
    isDisabled: () => toggleSwitch.disabled,
    /** getContent method - gets the innerHtml of the toggleSwitch element */
    getContent: () => element.innerHTML,
    /** getRootDisplay method - returns elements display css property*/
    getRootDisplay: () => {
      return domTestkit.getCssValue({
        className: 'root',
        property: 'display'
      });
    },
    /** getBorderRadius method - returns elements border-radius css property*/
    getBorderRadius() {
      return domTestkit.getCssValue({
        className: 'root label',
        property: 'border-radius'
      });
    }
  };
};
