import * as React from 'react';
import {reactEventTrigger} from '../react-helpers';
import {DriverFactory, BaseDriver} from '../driver-factory';
import {MountRendererProps, ReactWrapper} from 'enzyme';

export interface WrapperData {
  wrapper: ReactWrapper;
  dataHook: string;
}

export type MountFunctionType = (node: React.ReactElement<any>, options?: MountRendererProps) => ReactWrapper;
export type EnzymeDriverFactory<T extends BaseDriver> = (data: {element: Element | undefined, wrapper: ReactWrapper, eventTrigger: any}) => T;

export function enzymeTestkitFactoryCreator<T extends BaseDriver> (driverFactory: EnzymeDriverFactory<T>) {
  return (obj: WrapperData) => {
    const eventTrigger = reactEventTrigger();
    const regexp = new RegExp(`^<[^>]+data-hook="${obj.dataHook}"`);
    const component = obj.wrapper.findWhere(n => n.length > 0 && typeof n.type() === 'string' && (regexp).test(n.html()));
    const element = component.length > 0 ? component.first().getDOMNode() : undefined;
    return driverFactory({element, wrapper: obj.wrapper, eventTrigger});
  };
}

export function isEnzymeTestkitExists<T extends BaseDriver> (Element: React.ReactElement<any>, testkitFactory: (obj: WrapperData) => T, mount: MountFunctionType, options = {withoutDataHook: false}) {
  const dataHook = options.withoutDataHook ? '' : 'myDataHook';
  const elementToRender = React.cloneElement(Element, {dataHook, 'data-hook': dataHook});
  const wrapper = mount(elementToRender);
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
}
