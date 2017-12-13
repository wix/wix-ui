import * as React from 'react';
import {render} from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import {reactEventTrigger} from './helpers';

const componentFactory = Component => {
  let element;
  let componentInstance;
  const eventTrigger = reactEventTrigger(ReactTestUtils);

  const wrapperDiv = document.createElement('div');
  const ClonedComponent = React.cloneElement(Component, {ref: r => componentInstance = r});
  render(<div ref={r => element = r}>{ClonedComponent}</div>, wrapperDiv);
  return {element: element.childNodes[0], wrapper: wrapperDiv, component: ClonedComponent, componentInstance, eventTrigger};
};

export const createDriverFactory = driverFactory =>
  Component => driverFactory(componentFactory(Component));
