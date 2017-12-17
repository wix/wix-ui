import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const buttonDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  return {
    exists: () => !!element,
    click: () => eventTrigger.click(element),
    mouseEnter: () => eventTrigger.mouseEnter(element),
    mouseLeave: () => eventTrigger.mouseLeave(element),
    getType: () => element.getAttribute('type'),
    getTextContent: () => element.textContent,
    isDisabled: () => element.getAttribute('disabled') === '',
    getHeight: () => domTestkit.getCssValue({className: 'button', property: 'height'})
  };
};
