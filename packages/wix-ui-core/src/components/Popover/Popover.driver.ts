import { queryHook } from 'wix-ui-test-utils/dom';
import {BaseDriver, DriverBuilderParams} from '../../common/BaseDriver';

export class PopoverDriver extends BaseDriver {

  constructor(driverArgs: DriverBuilderParams) {
    super(driverArgs);
  }

  private byHook(dataHook: string) {
    return queryHook<HTMLElement>(this.element, dataHook) || queryHook<HTMLElement>(document, dataHook) ;
  }

  getTargetElement = () =>  this.byHook('popover-element');
  getContentElement = () =>  this.byHook('popover-content');
  isTargetElementExists = () =>  !!this.getTargetElement();
  isContentElementExists = () =>  !!this.getContentElement();
  
  inlineStyles = () => this.element.style;
  mouseEnter = () =>  this.eventTrigger.mouseEnter(this.element);
  mouseLeave = () =>  this.eventTrigger.mouseLeave(this.element);
  click = () => this.eventTrigger.click(this.element);
}

export const popoverDriverFactory = (driverArgs: DriverBuilderParams) => {
  return {
    ...new PopoverDriver(driverArgs)
  };
};
