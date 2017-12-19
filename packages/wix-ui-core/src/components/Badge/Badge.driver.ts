import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const badgeDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  return {
    exists: () => !!element,
    getType: () => element.getAttribute('type'),
    getContent: () => element.innerHTML,
    getHeight: () => domTestkit.getCssValue({className: 'badge', property: 'height'}),
    getPadding: () => domTestkit.getCssValue({className: 'badge', property: 'padding'}),
    getColor: () => domTestkit.getCssValue({className: 'badge', property: 'color'}),
    getOpacity: () => domTestkit.getCssValue({className: 'badge', property: 'opacity'}),
    getBorderRadius: () => domTestkit.getCssValue({className: 'badge', property: 'border-radius'}),
    getFontSize: () => domTestkit.getCssValue({className: 'badge', property: 'font-size'}),
    getLineHeight: () => domTestkit.getCssValue({className: 'badge', property: 'line-height'}),
    getTextDecoration: () => domTestkit.getCssValue({className: 'badge', property: 'text-decoration'}),
    getCursor: () => domTestkit.getCssValue({className: 'badge', property: 'cursor'})
  };
};
