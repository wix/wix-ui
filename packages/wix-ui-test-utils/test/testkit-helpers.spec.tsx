import * as React from 'react';
import {enzymeTestkitFactoryCreator, isEnzymeTestkitExists} from '../src/enzyme';
import {isTestkitExists, testkitFactoryCreator} from '../src/vanilla';
import {DriverFactory} from '../src/driver-factory';
import {mount} from 'enzyme';

describe('isTestkitExists', () => {
  const MyComp: React.StatelessComponent = () => (<div></div>);
  const driver: DriverFactory<{exists: () => boolean}, typeof MyComp> = element => {
    return {
      exists: () => !!element
    };
  };

  it('vanilla should exist', () => {
    expect(isTestkitExists(<MyComp/>, testkitFactoryCreator(driver))).toEqual(true);
  });

  it('enzyme should exist', () => {
    expect(isEnzymeTestkitExists(<MyComp/>, enzymeTestkitFactoryCreator(driver), mount)).toEqual(true);
  });
});
