import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const badgeDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  return {
    exists: () => !!element,
    getType: () => element.getAttribute('type'),
    getChildren: () => element.children,
    getHeight: () => domTestkit.getCssValue({className: 'badge', property: 'height'})
  };
};
