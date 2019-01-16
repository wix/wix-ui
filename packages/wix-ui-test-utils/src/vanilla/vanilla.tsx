import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import {reactEventTrigger} from '../react-helpers';
import {DriverFactory, BaseDriver} from '../driver-factory';
import {BaseUniDriver} from '../base-driver';
import {UniDriver} from 'unidriver';
import {reactUniDriver} from 'unidriver/react';

export interface TestkitArgs {
  wrapper: HTMLElement;
  dataHook: string;
}

const getElement = ({wrapper, dataHook}: TestkitArgs) => {
  const domInstance = ReactDom.findDOMNode(wrapper) as HTMLElement;

  if (domInstance) {
    const dataHookOnInstance = domInstance.attributes.getNamedItem(
      'data-hook'
    ) || {value: ''};

    return dataHook === dataHookOnInstance.value
      ? domInstance
      : domInstance.querySelector(`[data-hook='${dataHook}']`);
  }
};

export function testkitFactoryCreator<T extends BaseDriver>(
  driverFactory: DriverFactory<T>
) {
  return (testkitArgs: TestkitArgs) =>
    driverFactory({
      element: getElement(testkitArgs) as Element,
      wrapper: testkitArgs.wrapper,
      eventTrigger: reactEventTrigger()
    });
}

export function uniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: (base: UniDriver) => T
) {
  return (testkitArgs: TestkitArgs) => {
    const element = getElement(testkitArgs) as Element;
    return driverFactory(reactUniDriver(element));
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

export async function isUniTestkitExists<T extends BaseUniDriver>(
  Element: React.ReactElement<any>,
  testkitFactory: (obj: { wrapper: any; dataHook: string }) => T
) {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const elementToRender = React.cloneElement(Element, {
    'data-hook': dataHook,
    dataHook
  });
  const renderedElement = ReactTestUtils.renderIntoDocument(
    <div>{elementToRender}</div>
  );
  const wrapper = div.appendChild(renderedElement as any);
  const testkit = testkitFactory({wrapper, dataHook});
  return await testkit.exists();
}
