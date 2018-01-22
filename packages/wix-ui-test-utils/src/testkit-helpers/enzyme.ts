import * as React from 'react';
import {reactEventTrigger} from '../helpers';

export const enzymeTestkitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const eventTrigger = reactEventTrigger();
  const regexp = new RegExp(`^<[^>]+data-hook="${dataHook}"`);
  const component = wrapper.findWhere(n => n.length > 0 && typeof n.type() === 'string' && (regexp).test(n.html()));
  const element = component.length > 0 ? component.first().getDOMNode() : undefined;
  return driverFactory({element, wrapper, eventTrigger});
};

export const isEnzymeTestkitExists = (Element, testkitFactory, mount, options = {withoutDataHook: false}) => {
  const dataHook = options.withoutDataHook ? '' : 'myDataHook';
  const elementToRender = React.cloneElement(Element, {dataHook, 'data-hook': dataHook});
  const wrapper = mount(elementToRender);
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
};
