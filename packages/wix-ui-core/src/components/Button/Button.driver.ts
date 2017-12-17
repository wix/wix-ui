import {DomTestDriver} from 'wix-ui-jss/domTestkit';

export const buttonDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestDriver = null;

  if (componentInstance) {
    domTestDriver =  new DomTestDriver({componentId: componentInstance.id});
  }

  return {
    exists: () => !!element,
    click: () => eventTrigger.click(element),
    mouseEnter: () => eventTrigger.mouseEnter(element),
    mouseLeave: () => eventTrigger.mouseLeave(element),
    getType: () => element.getAttribute('type'),
    getTextContent: () => element.textContent,
    isDisabled: () => element.getAttribute('disabled') === '',
    getHeight: () => domTestDriver.getCssValue({className: 'button', property: 'height'})
  };
};
