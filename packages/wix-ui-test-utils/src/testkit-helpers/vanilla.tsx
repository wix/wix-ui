import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import {reactEventTrigger} from '../helpers';

export const testkitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const eventTrigger = reactEventTrigger();
  const element = wrapper.querySelector(`[data-hook='${dataHook}']`);
  return driverFactory({element, wrapper, eventTrigger});
};

export const isTestkitExists = (Element, testkitFactory) => {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';

  const elementToRender = React.cloneElement(Element, {'data-hook': dataHook, dataHook});
  const renderedElement = ReactTestUtils.renderIntoDocument(<div>{elementToRender}</div>);
  const wrapper = div.appendChild((renderedElement as any));
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
};
