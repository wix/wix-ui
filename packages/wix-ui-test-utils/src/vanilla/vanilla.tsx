import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import {reactEventTrigger} from '../react-helpers';
import {DriverFactory, BaseDriver} from '../driver-factory';
import {BaseUniDriver} from '../base-driver';
import {UniDriver} from 'unidriver';
import {reactUniDriver} from 'unidriver/react';

const getElementByDataHook = (wrapper: HTMLElement, dataHook: string ) => {
  const domInstance = ReactDom.findDOMNode(wrapper) as HTMLElement;
  if (domInstance) {
    const dataHookOnInstance = domInstance.attributes.getNamedItem('data-hook') || {value: ''};

    return dataHook === dataHookOnInstance.value
      ? domInstance
      : domInstance.querySelector(`[data-hook='${dataHook}']`);
  }
};

export function testkitFactoryCreator<T extends BaseDriver>(
  driverFactory: DriverFactory<T>
) {
  return (obj: { wrapper: HTMLElement; dataHook: string }) => {
    const eventTrigger = reactEventTrigger();
    /*
      https://github.com/facebook/react/commit/4070c4ca20b1d08a00fe278d561642e87373c09f
      https://github.com/facebook/react/issues/4692#issuecomment-133897672
      as react allows to use TestUtils.findAllInRenderedTree only on composite components, we need to
      support composite wrappers
    */
    const element = getElementByDataHook(obj.wrapper, obj.dataHook) as Element;
    return driverFactory({element, wrapper: obj.wrapper, eventTrigger});
  };
}

export function uniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: (base: UniDriver) => T
) {
  return (obj: { wrapper: HTMLElement; dataHook: string }) => {
    const element = obj.wrapper.querySelector(
      `[data-hook='${obj.dataHook}']`
    ) as Element;
    const base = reactUniDriver(element);
    return driverFactory(base);
  };
}

export function isTestkitExists<T extends BaseDriver>(
  Element: React.ReactElement<any>,
  testkitFactory: (obj: { wrapper: any; dataHook: string }) => T,
  options?: { dataHookPropName?: string }
) {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const dataHookPropName = options && options.dataHookPropName;
  const extraProps = dataHookPropName
    ? {[dataHookPropName]: dataHook}
    : {'data-hook': dataHook, dataHook}; // For backward compatibility add dataHook which is used in Wix-Style-React
  const elementToRender = React.cloneElement(Element, extraProps);
  const renderedElement = ReactTestUtils.renderIntoDocument(
    <div>{elementToRender}</div>
  );
  const wrapper = div.appendChild(renderedElement as any);
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
}

export async function isUniTestkitExists<T extends BaseUniDriver> (Element: React.ReactElement<any>, testkitFactory: (obj: {wrapper: any, dataHook: string}) => T) {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const elementToRender = React.cloneElement(Element, {'data-hook': dataHook});
  const renderedElement = ReactTestUtils.renderIntoDocument(<div>{elementToRender}</div>);
  const wrapper = div.appendChild((renderedElement as any));
  const testkit = testkitFactory({wrapper, dataHook});
  return await testkit.exists();
}
