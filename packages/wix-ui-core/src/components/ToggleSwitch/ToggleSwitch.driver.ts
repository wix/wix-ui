import { DomTestDriver } from './../../DOMStyleRenderer/domTest.driver';
import * as ReactTestUtils from 'react-dom/test-utils';

export const toggleSwitchDriverFactory = ({ element, componentInstance }) => {
  let domTestDriver = null;
  const toggleSwitch = element.querySelector('input');
  if(componentInstance){ // sometimes componentInstance is undefined
    domTestDriver =  new DomTestDriver({componentId: componentInstance.id} );
  }

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.change(toggleSwitch),
    isChecked: () => toggleSwitch.checked,
    isDisabled: () => toggleSwitch.disabled,
    isRootInlineBlock: () => {
      const displayValue = domTestDriver.getCssDeclarationValue('.root','display');
      return displayValue === 'inline-block';
    },
    getBorderRadius(){
      const borderRadius = domTestDriver.getCssDeclarationValue('.root label','border-radius');
      return borderRadius;
    }
  };
};
