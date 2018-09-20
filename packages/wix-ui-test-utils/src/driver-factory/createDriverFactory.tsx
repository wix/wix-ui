import * as React from 'react';
import {render} from 'react-dom';
import {Simulate} from 'react-dom/test-utils';
import {ReactWrapper} from 'enzyme';
import {reactEventTrigger} from '../react-helpers';

export type DriverFactory<TDriver extends BaseDriver> = (compFactory: ComponentFactory) => TDriver;

export interface BaseDriver {
  exists: () => boolean;
}

export interface BaseUniDriver {
  exists: () => Promise<boolean>;
}

export interface ComponentFactory {
  element: Element | undefined;
  wrapper: HTMLElement | ReactWrapper;
  component?: React.ReactElement<any>;
  eventTrigger: typeof Simulate;
}

function componentFactory(Component: React.ReactElement<any>): ComponentFactory {
  let element: HTMLDivElement | null;
  const eventTrigger = reactEventTrigger();

  const wrapperDiv = document.createElement('div');
  render(<div ref={r => element = r}>{Component}</div>, wrapperDiv);
  return {element: element! && element!.childNodes[0] as Element, wrapper: wrapperDiv, component: Component, eventTrigger};
}

export function createDriverFactory<TDriver extends BaseDriver>(driverFactory: DriverFactory<TDriver>) {
  return (Component: React.ReactElement<any>) => driverFactory(componentFactory(Component));
}
