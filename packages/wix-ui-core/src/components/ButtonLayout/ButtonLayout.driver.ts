import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const buttonLayoutDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  const getCssValue = (property: string) => domTestkit.getCssValue({className: 'buttonLayout', property});

  return {
    element: () => element,
    exists: () => !!element,
    click: () => eventTrigger.click(element),
    mouseEnter: () => eventTrigger.mouseEnter(element),
    mouseLeave: () => eventTrigger.mouseLeave(element),
    getTextContent: () => element.textContent,
    getHtmlContent: () => element.innerHTML,
    isDisabled: () => element.getAttribute('data-disabled') === 'true',
    styles: {
      /** returns elements height css property */
      getHeight: () => getCssValue('height'),
      /** returns elements padding css property */
      getPadding: () => getCssValue('padding'),
      /** returns elements border-radius css property */
      getBorderRadius: () => getCssValue('border-radius'),
    }
  };
};
