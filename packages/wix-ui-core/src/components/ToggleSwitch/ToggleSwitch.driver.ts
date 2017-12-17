import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const toggleSwitchDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;
  const toggleSwitch = element.querySelector('input');

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id} );
  }

  return {
    exists: () => !!element,
    click: () => eventTrigger.change(toggleSwitch),
    isChecked: () => toggleSwitch.checked,
    isDisabled: () => toggleSwitch.disabled,
    getRootDisplay: () => {
      return domTestkit.getCssValue({
        className: 'root',
        property: 'display'
      });
    },
    getBorderRadius() {
      return domTestkit.getCssValue({
        className: 'root label',
        property: 'border-radius'
      });
    }
  };
};
