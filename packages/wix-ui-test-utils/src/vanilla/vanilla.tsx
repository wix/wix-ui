import * as React from 'react';
import * as ReactDom from 'react-dom';
import {renderIntoDocument, Simulate} from 'react-dom/test-utils';

import {reactEventTrigger} from '../react-helpers';
import {BaseDriver} from '../driver-factory';
import {BaseUniDriver} from '../base-driver';

import {UniDriver} from '@unidriver/core';
import {jsdomReactUniDriver} from '@unidriver/jsdom-react';

export interface TestkitArgs {
  wrapper: HTMLElement;
  dataHook: string;
}

export type TestkitOutputRegular<T extends BaseDriver> = (data: {
  element: Element | undefined;
  wrapper: HTMLElement;
  eventTrigger: typeof Simulate;
  dataHook: string;
}) => T;

export type TestkitOutputUni<T extends BaseDriver> = (
  base: UniDriver,
  body: UniDriver,
  options: { dataHook: string }
) => T;

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
  driverFactory: TestkitOutputRegular<T>
) {
  return (testkitArgs: TestkitArgs) =>
    driverFactory({
      element: getElement(testkitArgs) as Element,
      wrapper: testkitArgs.wrapper,
      eventTrigger: reactEventTrigger(),
      dataHook: testkitArgs.dataHook,
    });
}

export function uniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: TestkitOutputUni<T>
) {
  return (testkitArgs: TestkitArgs) => {
    const element = getElement(testkitArgs) as Element;
    return driverFactory(
      jsdomReactUniDriver(element),
      jsdomReactUniDriver(document.body),
      {dataHook: testkitArgs.dataHook}
    );
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
  const renderedElement = renderIntoDocument(<div>{elementToRender}</div>);
  const wrapper = div.appendChild(renderedElement as any);
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
}

export async function isUniTestkitExists<T extends BaseUniDriver>(
  Element: React.ReactElement<any>,
  testkitFactory: (obj: { wrapper: any; dataHook: string }) => T,
  options?: { dataHookPropName?: string }
) {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const dataHookPropName = options && options.dataHookPropName;
  const extraProps = dataHookPropName
    ? {[dataHookPropName]: dataHook}
    : {'data-hook': dataHook, dataHook};
  const elementToRender = React.cloneElement(Element, extraProps);
  const renderedElement = renderIntoDocument(<div>{elementToRender}</div>);
  const wrapper = div.appendChild(renderedElement as any);
  const testkit = testkitFactory({wrapper, dataHook});
  return await testkit.exists();
}
