import {DomTestDriver} from './../../DOMStyleRenderer/domTest.driver';
import * as ReactTestUtils from 'react-dom/test-utils';

export const toggleSwitchDriverFactory = ({element, componentInstance}) => {
  let domTestDriver = null;
  const toggleSwitch = element.querySelector('input');
  if (componentInstance) {
    domTestDriver =  new DomTestDriver({componentId: componentInstance.id} );
  }
  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.change(toggleSwitch),
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
