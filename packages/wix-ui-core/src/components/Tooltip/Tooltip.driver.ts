import {DomTestkit} from 'wix-ui-jss/domTestkit';

const getElement = element => element.querySelector('[data-hook="tooltip-element"]');
const getContent = element => element.querySelector('[data-hook="popover-content"]');

export const tooltipDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  return {
    exists: () => !!element,
    isTargetElementExists: () => !!getElement(element),
    isContentExists: () => !!getContent(element),
    mouseEnter: () => eventTrigger.mouseEnter(element),
    styles: {
      getBackgroundColor: () => domTestkit.getCssValue({className: 'tooltip', property: 'background-color'}),
      getBorderWidth: () => domTestkit.getCssValue({className: 'tooltip', property: 'border-width'}),
      getBorderStyle: () => domTestkit.getCssValue({className: 'tooltip', property: 'border-style'}),
      getBorderColor: () => domTestkit.getCssValue({className: 'tooltip', property: 'border-color'}),
      getBorderRadius: () => domTestkit.getCssValue({className: 'tooltip', property: 'border-radius'}),
      getContentPadding: () => domTestkit.getCssValue({className: 'tooltip', property: 'padding'}),
    }
  };
};
