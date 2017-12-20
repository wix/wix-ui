export const popoverDriverFactory = ({element}) => ({
  exists: () => !!element,
  isContentVisible: () => window.getComputedStyle(
    element.querySelector('[data-hook="content"]')).display !== 'none'
});
