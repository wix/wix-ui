export const popoverDriverFactory = ({element}) => ({
  exists: () => !!element,
  isContentExists: () => !!element.querySelector('[data-hook="content"]')
});
