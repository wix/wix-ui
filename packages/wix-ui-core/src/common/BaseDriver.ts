import { Simulate } from 'react-dom/test-utils';

export interface DriverBuilderParams {
  element: HTMLElement;
  eventTrigger?: typeof Simulate;
}

/**
 * Base class for public drivers (exposed to consumers)
 */
export class BaseDriver {
  protected readonly element : HTMLElement;
  protected readonly eventTrigger: typeof Simulate;

  constructor({element, eventTrigger}: DriverBuilderParams) {
    this.element = element;
    this.eventTrigger = eventTrigger || Simulate;
  }

  exists = () => !!this.element;
}
