import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import {reactEventTrigger} from '../helpers';
import {DriverFactory, Driver} from '../createDriverFactory';

type TestKitFactoryCreator = (d: DriverFactory) => (obj: {wrapper: HTMLDivElement, dataHook: string}) => Driver;
type TestKitFactory = (obj: {wrapper: any, dataHook: string}) => Driver;

export const testkitFactoryCreator: TestKitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const eventTrigger = reactEventTrigger();
  const element = wrapper.querySelector(`[data-hook='${dataHook}']`) as Element;
  return driverFactory({element, wrapper, eventTrigger});
};

export const isTestkitExists = (Element: React.ReactElement<any>, testkitFactory: TestKitFactory) => {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';

  const elementToRender = React.cloneElement(Element, {'data-hook': dataHook, dataHook});
  const renderedElement = ReactTestUtils.renderIntoDocument(<div>{elementToRender}</div>);
  const wrapper = div.appendChild((renderedElement as any));
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
};
