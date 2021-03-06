import { popoverDriverFactory } from '../popover/Popover.driver';

export const tooltipDriverFactory = (args) => {
  const popoverDriver = popoverDriverFactory(args);
  const getTooltipStyle = () =>
    window.getComputedStyle(
      args.element.querySelector('[data-hook="popover-content"]'),
    );

  return {
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
      getContentPadding: () => getTooltipStyle().padding,
    },
    getTooltipText: () => {
      popoverDriver.mouseEnter();
      const text = popoverDriver.getContentElement().textContent;
      // Clean yourself!
      popoverDriver.mouseLeave();
      return text;
    },
    ...popoverDriver,
  };
};
