const getTargetElement = (element: Element | undefined) =>
  element && element.querySelectorAll('[data-hook="popover-element"]')[0];

const queryDocumentOrElement = (element, query) =>
  (element && element.querySelectorAll(query)[0]) ||
  (document && document.querySelector(query));

const getContentElement = (element: Element | undefined) => {
  const contentHook = element.getAttribute('data-content-hook');
  const contentSelector = `[data-content-element="${contentHook}"]`;
  return queryDocumentOrElement(element, contentSelector);
};

const getArrowElement = (element: Element | undefined) =>
  element && element.querySelectorAll('[data-hook="popover-arrow"]')[0];

export const popoverDriverFactory = ({ element, eventTrigger }) => ({
  /** Whether the element exists or not */
  exists: () => !!element,

  /** Returns the target element (`<Popover.Element/>`) */
  getTargetElement: () => getTargetElement(element),

  /** Returns the content element (`<Popover.Content/>`) */
  getContentElement: () => getContentElement(element),

  /** Returns the arrow element */
  getArrowElement: () => getArrowElement(element),

  /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
  isTargetElementExists: () => !!getTargetElement(element),

  /** Returns `true` whether the content element (`<Popover.Content/>`) exists */
  isContentElementExists: () => !!getContentElement(element),

  /** Trigger `mouseEnter` on the element */
  mouseEnter: () => eventTrigger.mouseEnter(element),

  /** Trigger `mouseLeave` on the element */
  mouseLeave: () => eventTrigger.mouseLeave(element),

  /** Click on the element */
  click: () => eventTrigger.click(getTargetElement(element)),

  /** Click outside the element */
  clickOutside: () => {
    document.dispatchEvent(new Event('mousedown'));
  },

  /** Returns the arrow offset */
  getArrowOffset: () => {
    const { top, left, right, bottom } = (getArrowElement(
      element,
    ) as HTMLElement).style;
    return { top, left, right, bottom };
  },

  /** Returns the element's inline styles */
  inlineStyles: () => element.style,

  /** Returns the element's id */
  getElementId: () => element.id,
});
