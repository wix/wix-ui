const getElement = element => element.querySelector('[data-hook="tooltip-element"]');
const getContent = element => element.querySelector('[data-hook="popover-content"]');

export const tooltipDriverFactory = ({element, eventTrigger}) => {
  const getTooltipStyle = () => window.getComputedStyle(element.querySelector('.tooltip'));

  return {
    /** Checks if the tooltip exists */
    exists: () => !!element,
    /** Checks if the target element exists */
    isTargetElementExists: () => !!getElement(element),
    /** Checks if the content element exists */
    isContentExists: () => !!getContent(element),
    /** Invokes mouseEnter on the tooltip */
    mouseEnter: () => eventTrigger.mouseEnter(element),
    styles: {
      /** Gets background color */
      getBackgroundColor: () => getTooltipStyle().backgroundColor,
      /** Gets border width */
      getBorderWidth: () => getTooltipStyle().borderWidth,
      /** Gets border style */
      getBorderStyle: () => getTooltipStyle().borderStyle,
      /** Gets border color */
      getBorderColor: () => getTooltipStyle().borderColor,
      /** Gets border radius */
      getBorderRadius: () => getTooltipStyle().borderRadius,
      /** Gets content padding */
      getContentPadding: () => getTooltipStyle().padding
    }
  };
};
