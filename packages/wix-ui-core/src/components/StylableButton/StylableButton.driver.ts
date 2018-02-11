export const stylableButtonDriverFactory = ({element, eventTrigger}) => {
  const getStylableButtonStyle = () => window.getComputedStyle(element);

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
      getMinWidth: () => getStylableButtonStyle().minWidth,
      /** returns elements width css property */
      getWidth: () => getStylableButtonStyle().width,
      /** returns elements height css property */
      getHeight: () => getStylableButtonStyle().height,
      /** returns elements padding css property */
      getPadding: () => getStylableButtonStyle().padding,
      /** returns elements border-radius css property */
      getBorderRadius: () => getStylableButtonStyle().borderRadius,
    }
  };
};
