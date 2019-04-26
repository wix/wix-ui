import * as React from 'react';
import {reactEventTrigger} from '../react-helpers';
import {BaseDriver} from '../driver-factory';
import {BaseUniDriver} from '../base-driver';
import {MountRendererProps, ReactWrapper} from 'enzyme';
import {UniDriver} from '@unidriver/core';
import {jsdomReactUniDriver} from '@unidriver/jsdom-react';

export interface WrapperData {
  wrapper: ReactWrapper;
  dataHook: string;
}

export type MountFunctionType = (
  node: React.ReactElement<any>,
  options?: MountRendererProps
) => ReactWrapper;
export type EnzymeDriverFactory<T extends BaseDriver> = (data: {
  element: Element | undefined;
  wrapper: ReactWrapper;
  eventTrigger: any;
  dataHook: string;
}) => T;

export function enzymeTestkitFactoryCreator<T extends BaseDriver>(
  driverFactory: EnzymeDriverFactory<T>
) {
  return (obj: WrapperData) => {
    const eventTrigger = reactEventTrigger();
    const regexp = new RegExp(`^<[^>]+data-hook="${obj.dataHook}"`);
    const component = obj.wrapper.findWhere(
      n => n.length > 0 && typeof n.type() === 'string' && regexp.test(n.html())
    );
    const element =
      component.length > 0 ? component.first().getDOMNode() : undefined;
    return driverFactory({
      element,
      wrapper: obj.wrapper,
      eventTrigger,
      dataHook: obj.dataHook,
    });
  };
}

export interface options {
  dataHook?: string;
}

export function enzymeUniTestkitFactoryCreator<T extends BaseUniDriver>(
  driverFactory: (
    base: UniDriver,
    body: UniDriver,
    {dataHook: string}: options
  ) => T
) {
  return (obj: WrapperData) => {
    const regexp = new RegExp(`^<[^>]+data-hook="${obj.dataHook}"`);
    const component = obj.wrapper.findWhere(
      n => n.length > 0 && typeof n.type() === 'string' && regexp.test(n.html())
    );
    const element =
      component.length > 0 ? component.first().getDOMNode() : undefined;
    const base = jsdomReactUniDriver(element as Element);
    const body = jsdomReactUniDriver(document.body as Element);
    return driverFactory(base, body, {dataHook: obj.dataHook});
  };
}

export interface Options {
  withoutDataHook?: boolean;
  /** The dataHookPropName exists in order to support legacy CamelCase `dataHook`
   *  which is used in Wix-Style-React, while the current prop name used in
   * `wix-ui-core` is snake-case `data-hook`.
   * */
  dataHookPropName?: 'data-hook' | 'dataHook';
}

/**
 * Checks if the given Element accepts a data hook, and that the testkit factory finds the component's root element using that data hook.
 *
 * This method supports both new snake-case and legacy camelCase data hook prop name (e.g `data-hook` and `dataHook`).
 * The default is to check by both prop name options.
 */
export function isEnzymeTestkitExists<T extends BaseDriver>(
  Element: React.ReactElement<any>,
  testkitFactory: (obj: WrapperData) => T,
  mount: MountFunctionType,
  options: Options = {}
) {
  return isEnzymeTestkitExistsInternal({
    Element,
    testkitFactory,
    mount,
    ...options,
  });
}

export async function isUniEnzymeTestkitExists<T extends BaseUniDriver>(
  Element: React.ReactElement<any>,
  testkitFactory: (obj: WrapperData) => T,
  mount: MountFunctionType,
  {withoutDataHook, dataHookPropName}: Options = {}
) {
  const dataHook = withoutDataHook ? '' : 'myDataHook';
  const extraProps = dataHookPropName
    ? {[dataHookPropName]: dataHook}
    : {dataHook, 'data-hook': dataHook};
  const elementToRender = React.cloneElement(Element, extraProps);
  const wrapper = mount(elementToRender);
  const testkit = testkitFactory({wrapper, dataHook});
  return await testkit.exists();
}

/**
 * This internal function is only in order to allow separate defaults to each options.
 */
function isEnzymeTestkitExistsInternal<T extends BaseDriver>({
  Element,
  testkitFactory,
  mount,
  withoutDataHook = false,
  dataHookPropName,
}: FlatOptions<T>) {
  const dataHook = withoutDataHook ? '' : 'myDataHook';
  const extraProps = dataHookPropName
    ? {[dataHookPropName]: dataHook}
    : {dataHook, 'data-hook': dataHook};
  const elementToRender = React.cloneElement(Element, extraProps);
  const wrapper = mount(elementToRender);
  const testkit = testkitFactory({wrapper, dataHook});
  return testkit.exists();
}

interface FlatOptions<T extends BaseDriver> {
  Element: React.ReactElement<any>;
  testkitFactory: (obj: WrapperData) => T;
  mount: MountFunctionType;
  withoutDataHook?: boolean;
  /** The dataHookPropName exists in order to support legacy CamelCase `dataHook`
   *  which is used in Wix-Style-React, while the current prop name used in
   * `wix-ui-core` is snake-case `data-hook`.
   * */
  dataHookPropName?: 'data-hook' | 'dataHook';
}
