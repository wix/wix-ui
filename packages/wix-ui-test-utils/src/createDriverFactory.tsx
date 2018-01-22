import * as React from 'react';
import {render} from 'react-dom';
import {reactEventTrigger} from './helpers';

const componentFactory = (Component: React.ReactElement<any>) => {
  let element;
  let componentInstance;
  const eventTrigger = reactEventTrigger();

  const wrapperDiv = document.createElement('div');
  const ClonedComponent = React.cloneElement(Component, {ref: (r: Element) => componentInstance = r});
  render(<div ref={r => element = r}>{ClonedComponent}</div>, wrapperDiv);
  return {element: element.childNodes[0], wrapper: wrapperDiv, component: ClonedComponent, componentInstance, eventTrigger};
};

export const createDriverFactory = (driverFactory) =>
  (Component: React.ReactElement<any>) => driverFactory(componentFactory(Component));
