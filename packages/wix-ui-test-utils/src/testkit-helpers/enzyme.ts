import * as React from 'react';
import {mount} from 'enzyme';

export const enzymeTestkitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const regexp = new RegExp(`^<[^>]+data-hook="${dataHook}"`);
  const component = wrapper.findWhere(n => typeof n.type() === 'string' && (regexp).test(n.html()));
  return driverFactory({element: component.node, wrapper});
};

export const isEnzymeTestkitExists = (Element, testkitFactory, options = {withoutDataHook: false}) => {
  const dataHook = 'myDataHook';
  const elementToRender = React.cloneElement(Element, {dataHook: options.withoutDataHook ? '' : dataHook});
  const wrapper = mount(elementToRender);
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
};
