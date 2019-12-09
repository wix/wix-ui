import { popoverDriverFactory } from '../popover-next.driver';

const queryDocumentOrElement = (element, query) =>
  (element && element.querySelectorAll(query)[0]) ||
  (document && document.querySelector(query));

const getContentElement = (element: Element | undefined) => {
  const contentHook = element.getAttribute('data-content-hook');
  const contentSelector = `[data-content-element="${contentHook}"]`;
  return queryDocumentOrElement(element, contentSelector);
};

const getPortalElement = (element: Element | undefined) =>
  queryDocumentOrElement(element, '[data-hook="popover-portal"]');

export const popoverNextPrivateDriverFactory = ({ element, eventTrigger }) => ({
  ...popoverDriverFactory({ element, eventTrigger }),

  /** Perform a click outside on the content element */
  clickOnContent: () => {
    const event = new Event('mousedown', { bubbles: true });
    getContentElement(element).dispatchEvent(event);
  },

  /** Return the <Popover/>'s portal element */
  getPortalElement: () => getPortalElement(element),
});
