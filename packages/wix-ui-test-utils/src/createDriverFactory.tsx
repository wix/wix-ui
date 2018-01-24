import * as React from 'react';
import {render} from 'react-dom';
import {Simulate} from 'react-dom/test-utils';
import {reactEventTrigger} from './helpers';
import {ReactWrapper} from 'enzyme';

export type DriverFactory<T> = (compFactory: ComponentFactory) => T;

export interface BaseDriver {
  exists: () => boolean;
}

export interface ComponentFactory {
  element: Node | Element | undefined;
  wrapper: HTMLElement | ReactWrapper;
  component?: React.ReactElement<any>;
  componentInstance?: React.ReactInstance | undefined;
  eventTrigger: typeof Simulate;
}

const componentFactory: (Component: React.ReactElement<any>) => ComponentFactory = Component => {
  let element: HTMLDivElement | null;
  let componentInstance;
  const eventTrigger = reactEventTrigger();

  const wrapperDiv = document.createElement('div');
  const ClonedComponent = React.cloneElement(Component, {ref: (r: Element) => componentInstance = r});
  render(<div ref={r => element = r}>{ClonedComponent}</div>, wrapperDiv);
  return {element: element! && element!.childNodes[0], wrapper: wrapperDiv, component: ClonedComponent, componentInstance, eventTrigger};
};

export function createDriverFactory<T>(driverFactory: DriverFactory<T>) {
  return (Component: React.ReactElement<any>) => driverFactory(componentFactory(Component));
}
