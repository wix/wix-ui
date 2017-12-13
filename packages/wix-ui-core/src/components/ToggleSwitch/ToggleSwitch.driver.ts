import {DomTestDriver} from './../../DOMStyleRenderer/domTest.driver';

export const toggleSwitchDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestDriver = null;
  const toggleSwitch = element.querySelector('input');

  if (componentInstance) {
    domTestDriver =  new DomTestDriver({componentId: componentInstance.id} );
  }

  return {
    exists: () => !!element,
    click: () => eventTrigger.change(toggleSwitch),
    isChecked: () => toggleSwitch.checked,
    isDisabled: () => toggleSwitch.disabled,
    getRootDisplay: () => {
      return domTestDriver.getCssValue({
        className: 'root',
        property: 'display'
      });
    },
    getBorderRadius() {
      return domTestDriver.getCssValue({
        className: 'root label',
        property: 'border-radius'
      });
    }
  };
};
