import * as React from 'react';
import {isTestkitExists, testkitFactoryCreator, enzymeTestkitFactoryCreator, isEnzymeTestkitExists} from '../src';
import {Driver, DriverFactory} from '../src/createDriverFactory';
import {mount} from 'enzyme';

describe('isTestkitExists', () => {
  const MyComp: React.SFC = () => (<div></div>);
  const driver: DriverFactory = (element) => {
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
