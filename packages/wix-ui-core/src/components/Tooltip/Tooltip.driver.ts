import {popoverDriverFactory} from '../../baseComponents/Popover/Popover.driver';

export const tooltipDriverFactory = (args) => {
  const {element, eventTrigger} = args;
  const popoverDriver = popoverDriverFactory(args);
  const getTooltipStyle = () => window.getComputedStyle(element.querySelector('[data-hook="popover-content"]'));

  return {
    /** Checks if the tooltip exists */
    exists: () => !!element,
    /** Checks if the target element exists */
    isTargetElementExists: () => popoverDriver.isElementExists(),
    /** Checks if the content element exists */
    isContentExists: () => popoverDriver.isContentExists(),
    /** Invokes mouseEnter on the tooltip */
    mouseEnter: () => eventTrigger.mouseEnter(element),
    /** Invokes mouseLeave on the tooltip */
    mouseLeave: () => eventTrigger.mouseLeave(element),
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
