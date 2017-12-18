export const popoverDriverFactory = ({element, eventTrigger}) => {
  return {
    exists: () => !!element,
    contentExists: () => !!element.querySelector('.content'),
    clickElement: () => eventTrigger.click(element.querySelector('[data-hook="target"]'))
  };
};
