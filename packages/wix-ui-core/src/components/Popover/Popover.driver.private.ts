import { queryHook } from 'wix-ui-test-utils/dom';
import { Simulate } from 'react-dom/test-utils';

export class PopoverDriverPrivate {
  element: HTMLElement;
  eventTrigger?: typeof Simulate

  constructor({element, eventTrigger = Simulate}:
    {element: HTMLElement, eventTrigger?: typeof Simulate}) {
    this.element = element;
    this.eventTrigger = eventTrigger;
  }

  /* Since Popover.Content can render outside the component's root, let's query
   * the entire document with the assumption that we don't render more than one
   * popover at a time.
   */
  private byHook(dataHook: string) {
    return queryHook<HTMLElement>(document, dataHook);
  }

  getTargetElement = () =>  this.byHook('popover-element');
  getContentElement = () =>  this.byHook('popover-content');
  isTargetElementExists = () =>  !!this.getTargetElement();
  isContentElementExists = () =>  !!this.getContentElement();
  inlineStyles = () =>  this.element.style;
  getArrowOffset = () => {
    const {top, left, right, bottom} = (this.byHook('popover-arrow') as HTMLElement).style;
    return {top, left, right, bottom};
  }
  getPortalElement = () =>  this.byHook('popover-portal');
  mouseEnter = () =>  this.eventTrigger.mouseEnter(this.element);
  mouseLeave = () =>  this.eventTrigger.mouseLeave(this.element);
};
