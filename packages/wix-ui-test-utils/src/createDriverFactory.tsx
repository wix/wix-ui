import * as React from 'react';
import {render} from 'react-dom';
import {Simulate} from 'react-dom/test-utils';
import {reactEventTrigger} from './helpers';
import {ReactWrapper} from 'enzyme';

export type DriverFactory<TDriver extends BaseDriver, TComponent> = (compFactory: ComponentFactory<TComponent>) => TDriver;

export interface BaseDriver {
  exists: () => boolean;
}

export interface ComponentFactory<T> {
  element: Element | undefined;
  wrapper: HTMLElement | ReactWrapper;
  component?: React.ReactElement<any>;
  componentInstance?: T;
  eventTrigger: typeof Simulate;
}

function componentFactory<T>(Component: React.ReactElement<any>): ComponentFactory<T> {
  let element: HTMLDivElement | null;
  let componentInstance;
  const eventTrigger = reactEventTrigger();

  const wrapperDiv = document.createElement('div');
  const ClonedComponent = React.cloneElement(Component, {ref: (r: T) => componentInstance = r});
  render(<div ref={r => element = r}>{ClonedComponent}</div>, wrapperDiv);
  return {element: element! && element!.childNodes[0] as Element, wrapper: wrapperDiv, component: ClonedComponent, componentInstance, eventTrigger};
}

export function createDriverFactory<TDriver extends BaseDriver, TComponent>(driverFactory: DriverFactory<TDriver, TComponent>) {
  return (Component: React.ReactElement<any>) => driverFactory(componentFactory(Component));
}
