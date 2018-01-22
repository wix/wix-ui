import * as React from 'react';
import {render} from 'react-dom';
import {EventSimulator} from 'react-dom/test-utils';
import {reactEventTrigger} from './helpers';
import {ReactWrapper} from 'enzyme';

export type DriverFactory = (compFactory: ComponentFactory) => Driver;

export interface Driver {
  [key: string]: any;
}

export interface ComponentFactory {
  element: Node | Element | undefined;
  wrapper: HTMLElement | ReactWrapper;
  component?: React.ReactElement<any>;
  componentInstance?: React.ReactInstance | undefined;
  eventTrigger: { [key: string]: EventSimulator};
}

const componentFactory: (Component: React.ReactElement<any>) => ComponentFactory = (Component: React.ReactElement<any>) => {
  let element: HTMLDivElement | null;
  let componentInstance;
  const eventTrigger = reactEventTrigger();

  const wrapperDiv = document.createElement('div');
  const ClonedComponent = React.cloneElement(Component, {ref: (r: Element) => componentInstance = r});
  render(<div ref={r => element = r}>{ClonedComponent}</div>, wrapperDiv);
  return {element: element! && element!.childNodes[0], wrapper: wrapperDiv, component: ClonedComponent, componentInstance, eventTrigger} as ComponentFactory;
};

export const createDriverFactory: (DriverFactory: DriverFactory) => Driver = (driverFactory: DriverFactory) =>
  (Component: React.ReactElement<any>) => driverFactory(componentFactory(Component));
