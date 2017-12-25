import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const buttonLayoutDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  const getCssValue = (property: string) => domTestkit.getCssValue({className: 'buttonLayout', property});

  return {
    /** returns the element */
    element: () => element,
    /** checks if element exists */
    exists: () => !!element,
    /** click on the element */
    click: () => eventTrigger.click(element),
    /** trigger mouseenter on the element */
    mouseEnter: () => eventTrigger.mouseEnter(element),
    /** trigger mouseleave on the element */
    mouseLeave: () => eventTrigger.mouseLeave(element),
    /** returns elements textContent */
    getTextContent: () => element.textContent,
    /** returns elements innerHTML */
    getHtmlContent: () => element.innerHTML,
    /** returns if the element is disabled */
    isDisabled: () => element.classList.contains('disabled'),
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
