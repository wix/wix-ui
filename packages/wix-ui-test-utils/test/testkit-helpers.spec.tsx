import * as React from 'react';
import {
  enzymeTestkitFactoryCreator,
  enzymeUniTestkitFactoryCreator,
  isEnzymeTestkitExists,
  isUniEnzymeTestkitExists
} from '../src/enzyme';
import {isTestkitExists, isUniTestkitExists, testkitFactoryCreator, uniTestkitFactoryCreator} from '../src/vanilla';
import {DriverFactory} from '../src/driver-factory';
import {mount} from 'enzyme';
import {baseUniDriverFactory} from '../src/base-driver';

describe('isTestkitExists', () => {
  const MyComp: React.StatelessComponent<{dataHook?: string, 'data-hook'?: string}> = (props) => (<div data-hook={props.dataHook || props['data-hook']}/>);
  const driver: DriverFactory<{exists: () => boolean}> = element => {
    return {
      exists: () => !!element
    };
  };

  it('vanilla should exist', () => {
    expect(isTestkitExists(<MyComp/>, testkitFactoryCreator(driver))).toEqual(true);
  });

  it('vanilla should exist using data-hook only', () => {
    expect(isTestkitExists(<MyComp/>, testkitFactoryCreator(driver), {dataHookPropName: 'data-hook'})).toEqual(true);
  });

  it('vanilla uniTestkit should exist',  () => {
    expect(isUniTestkitExists(<MyComp/>, uniTestkitFactoryCreator(baseUniDriverFactory))).resolves.toEqual(true);
  });

  it('vanilla uniTestkit should exist using data-hook only', () => {
    expect(isUniTestkitExists(<MyComp/>, uniTestkitFactoryCreator(baseUniDriverFactory), {dataHookPropName: 'data-hook'})).resolves.toEqual(true);
  });

  it('enzyme should exist', () => {
    expect(isEnzymeTestkitExists(<MyComp/>, enzymeTestkitFactoryCreator(driver), mount)).toEqual(true);
  });

  it('enzyme should exist without data-hook value', () => {
    expect(isEnzymeTestkitExists(<MyComp/>, enzymeTestkitFactoryCreator(driver), mount, {withoutDataHook: true})).toEqual(true);
  });

  it('enzyme should exist using data-hook prop name only', () => {
    expect(isEnzymeTestkitExists(<MyComp/>, enzymeTestkitFactoryCreator(driver), mount, {dataHookPropName: 'data-hook'})).toEqual(true);
  });

  it('enzyme should exist', () => {
    expect(isUniEnzymeTestkitExists(<MyComp/>, enzymeUniTestkitFactoryCreator(baseUniDriverFactory), mount)).resolves.toEqual(true);
  });

  it('enzyme should exist without data-hook value', () => {
    expect(isUniEnzymeTestkitExists(<MyComp/>, enzymeUniTestkitFactoryCreator(baseUniDriverFactory), mount, {withoutDataHook: true})).resolves.toEqual(true);
  });

  it('enzyme should exist using data-hook prop name only', () => {
    expect(isUniEnzymeTestkitExists(<MyComp/>, enzymeUniTestkitFactoryCreator(baseUniDriverFactory), mount, {dataHookPropName: 'data-hook'})).resolves.toEqual(true);
  });
});
