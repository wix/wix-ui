import {popoverDriverFactory} from './Popover.driver';

const queryDocumentOrElement = (element, query) =>
  ((element && element.querySelectorAll(query)[0]) || document && document.querySelector(query));

const getContentElement = (element: Element | undefined) =>
  queryDocumentOrElement(element, '[data-hook="popover-content"]');

const getPortalElement = (element: Element | undefined) =>
  queryDocumentOrElement(element, '[data-hook="popover-portal"]');

export const popoverPrivateDriverFactory = ({element, eventTrigger}) => ({

  ...popoverDriverFactory({element, eventTrigger}),

  /** Click on the content */
  clickContentElement: () => eventTrigger.click(getContentElement(element)),

  /** Return the <Popover/>'s portal element */
  getPortalElement: () => getPortalElement(element),
});
