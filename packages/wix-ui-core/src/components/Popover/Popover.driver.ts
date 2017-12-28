export const popoverDriverFactory = ({element}) => ({
  exists: () => !!element,
  isElementExists: () => !!element.querySelector('[data-hook="popover-element"]'),
  isContentExists: () => !!element.querySelector('[data-hook="popover-content"]')
});
