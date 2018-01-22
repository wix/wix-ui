import * as React from 'react';
import {reactEventTrigger} from '../helpers';
import {DriverFactory, Driver} from '../createDriverFactory';
import {MountRendererProps, ReactWrapper} from 'enzyme';

interface WrapperData {
  wrapper: ReactWrapper;
  dataHook: string;
}

type EnzymeTestKitFactory = (obj: WrapperData) => Driver;
type MountFunctionType = (node: React.ReactElement<any>, options?: MountRendererProps) => ReactWrapper;
type EnzymeDriverFactory = (data: {element: Element | undefined, wrapper: ReactWrapper, eventTrigger: any}) => Driver;

export const enzymeTestkitFactoryCreator = (driverFactory: EnzymeDriverFactory) => (obj: WrapperData) => {
  const eventTrigger = reactEventTrigger();
  const regexp = new RegExp(`^<[^>]+data-hook="${obj.dataHook}"`);
  const component = obj.wrapper.findWhere(n => n.length > 0 && typeof n.type() === 'string' && (regexp).test(n.html()));
  const element = component.length > 0 ? component.first().getDOMNode() : undefined;
  return driverFactory({element, wrapper: obj.wrapper, eventTrigger});
};

export const isEnzymeTestkitExists = (Element: React.ReactElement<any>, testkitFactory: EnzymeTestKitFactory, mount: MountFunctionType, options = {withoutDataHook: false}) => {
  const dataHook = options.withoutDataHook ? '' : 'myDataHook';
  const elementToRender = React.cloneElement(Element, {dataHook, 'data-hook': dataHook});
  const wrapper = mount(elementToRender);
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
};
