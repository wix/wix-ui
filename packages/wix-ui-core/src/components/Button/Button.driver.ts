export const buttonDriverFactory = ({element, eventTrigger}) => {
  const getButtonStyle = () => window.getComputedStyle(element);

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** click on the element */
    click: () => eventTrigger.click(element),
    /** returns elements type attribute */
    getType: () => element.getAttribute('type'),
    /** returns elements textContent */
    getTextContent: () => element.textContent,
    /** returns if the element is disabled */
    isDisabled: () => element.getAttribute('disabled') === '',
    styles: {
      /** returns elements min-width css property */
      getMinWidth: () => getButtonStyle().minWidth,
      /** returns elements width css property */
      getWidth: () => getButtonStyle().width,
      /** returns elements height css property */
      getHeight: () => getButtonStyle().height,
      /** returns elements padding css property */
      getPadding: () => getButtonStyle().padding,
      /** returns elements border-radius css property */
      getBorderRadius: () => getButtonStyle().borderRadius,
    }
  };
};
