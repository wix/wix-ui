import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const buttonDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** click on the element */
    click: () => eventTrigger.click(element),
    /** trigger mouseenter on the element */
    mouseEnter: () => eventTrigger.mouseEnter(element),
    /** trigger mouseleave on the element */
    mouseLeave: () => eventTrigger.mouseLeave(element),
    /** returns elements type attribute */
    getType: () => element.getAttribute('type'),
    /** returns elements textContent */
    getTextContent: () => element.textContent,
    /** returns if the element is disabled */
    isDisabled: () => element.getAttribute('disabled') === '',
    styles: {
      /** returns elements min-width css property */
      getMinWidth: () => domTestkit.getCssValue({className: 'button', property: 'min-width'}),
      /** returns elements width css property */
      getWidth: () => domTestkit.getCssValue({className: 'button', property: 'width'}),
      /** returns elements height css property */
      getHeight: () => domTestkit.getCssValue({className: 'button', property: 'height'}),
      /** returns elements padding css property */
      getPadding: () => domTestkit.getCssValue({className: 'button', property: 'padding'}),
      /** returns elements border-radius css property */
      getBorderRadius: () => domTestkit.getCssValue({className: 'button', property: 'border-radius'}),
    }
  };
};
