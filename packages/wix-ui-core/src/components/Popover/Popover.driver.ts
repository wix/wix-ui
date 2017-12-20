export const popoverDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  isContentExists: () => !!element.querySelector('.content'),
  clickElement: () => eventTrigger.click(element.querySelector('[data-hook="target"]'))
});
