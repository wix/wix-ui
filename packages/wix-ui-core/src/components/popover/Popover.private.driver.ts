import {popoverDriverFactory} from './Popover.driver';

const queryDocumentOrElement = (element, query) =>
  ((element && element.querySelectorAll(query)[0]) || document && document.querySelector(query));

const getContentElement = (element: Element | undefined) =>
  queryDocumentOrElement(element, '[data-hook="popover-content"]');

const getPortalElement = (element: Element | undefined) =>
  queryDocumentOrElement(element, '[data-hook="popover-portal"]');

export const popoverPrivateDriverFactory = ({element, eventTrigger}) => ({

  ...popoverDriverFactory({element, eventTrigger}),

  /** Perform a click outside on the content element */
  clickOutsideOnContent: () => {
    const event = new Event('mousedown', { bubbles: true });
    getContentElement(element).dispatchEvent(event);

  },

  /** Return the <Popover/>'s portal element */
  getPortalElement: () => getPortalElement(element),
});
