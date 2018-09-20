import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import {reactEventTrigger} from '../react-helpers';
import {DriverFactory, BaseDriver, BaseUniDriver} from '../driver-factory';
import {UniDriver, reactUniDriver} from 'unidriver';

export function testkitFactoryCreator<T extends BaseDriver> (driverFactory: DriverFactory<T>) {
  return (obj: {wrapper: HTMLElement, dataHook: string}) => {
    const eventTrigger = reactEventTrigger();
    const element = obj.wrapper.querySelector(`[data-hook='${obj.dataHook}']`) as Element;
    return driverFactory({element, wrapper: obj.wrapper, eventTrigger});
  };
}

export function uniTestkitFactoryCreator<T extends BaseUniDriver> (driverFactory: (base: UniDriver) => T) {
  return (obj: {wrapper: HTMLElement, dataHook: string}) => {
    const element = obj.wrapper.querySelector(`[data-hook='${obj.dataHook}']`) as Element;
    const base = reactUniDriver(element);
    return driverFactory(base);
  };
}

export function isTestkitExists<T extends BaseDriver> (Element: React.ReactElement<any>, testkitFactory: (obj: {wrapper: any, dataHook: string}) => T, options?: {dataHookPropName?: string}) {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const dataHookPropName = options && options.dataHookPropName;
  const extraProps = dataHookPropName ?
    {[dataHookPropName]: dataHook} :
    {'data-hook': dataHook, dataHook}; // For backward compatibility add dataHook which is used in Wix-Style-React
  const elementToRender = React.cloneElement(Element, extraProps);
  const renderedElement = ReactTestUtils.renderIntoDocument(<div>{elementToRender}</div>);
  const wrapper = div.appendChild((renderedElement as any));
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
}

export function isUniTestkitExists<T extends BaseUniDriver> (Element: React.ReactElement<any>, testkitFactory: (obj: {wrapper: any, dataHook: string}) => T) {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const elementToRender = React.cloneElement(Element, {'data-hook': dataHook});
  const renderedElement = ReactTestUtils.renderIntoDocument(<div>{elementToRender}</div>);
  const wrapper = div.appendChild((renderedElement as any));
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
}
