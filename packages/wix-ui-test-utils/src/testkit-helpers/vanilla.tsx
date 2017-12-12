import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';

export const testkitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const element = wrapper.querySelector(`[data-hook='${dataHook}']`);
  return driverFactory({element, wrapper});
};

export const isTestkitExists = (Element, testkitFactory) => {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';

  const elementToRender = React.cloneElement(Element, {dataHook});
  const renderedElement = ReactTestUtils.renderIntoDocument(<div>{elementToRender}</div>);
  const wrapper = div.appendChild((renderedElement as any));
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
};
