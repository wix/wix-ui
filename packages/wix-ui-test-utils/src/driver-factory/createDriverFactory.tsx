import * as React from 'react';
import {render} from 'react-dom';
import {Simulate} from 'react-dom/test-utils';
import {ReactWrapper} from 'enzyme';
import {reactEventTrigger} from '../react-helpers';

function isReactClassComponent(value: any): value is React.ComponentClass<any> {
  return value && isComponentInstance(value.prototype);
}

function isComponentInstance(value: any): value is React.Component {
  return value && value instanceof React.Component;
}

export type DriverFactory<TDriver extends BaseDriver, TComponent> = (compFactory: ComponentFactory<TComponent>) => TDriver;

export interface BaseDriver {
  exists: () => boolean;
}

export interface ComponentFactory<TComponent> {
  element: Element | undefined;
  wrapper: HTMLElement | ReactWrapper;
  component?: React.ReactElement<any>;
  componentInstance?: TComponent;
  eventTrigger: typeof Simulate;
}

function componentFactory<TComponent>(Component: React.ReactElement<any>): ComponentFactory<TComponent> {
  let element: HTMLDivElement | null;
  let componentInstance;
  const eventTrigger = reactEventTrigger();

  const wrapperDiv = document.createElement('div');
  let ClonedComponent = Component;
  if (isReactClassComponent(Component)) {
    React.cloneElement(Component, {ref: (r: TComponent) => componentInstance = r});
  }
  render(<div ref={r => element = r}>{ClonedComponent}</div>, wrapperDiv);
  return {element: element! && element!.childNodes[0] as Element, wrapper: wrapperDiv, component: ClonedComponent, componentInstance, eventTrigger};
}

export function createDriverFactory<TDriver extends BaseDriver, TComponent>(driverFactory: DriverFactory<TDriver, TComponent>) {
  return (Component: React.ReactElement<any>) => driverFactory(componentFactory(Component));
}
