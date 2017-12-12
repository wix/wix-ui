import * as React from 'react';
import {isTestkitExists, testkitFactoryCreator, enzymeTestkitFactoryCreator, isEnzymeTestkitExists} from '../src';

describe('isTestkitExists', () => {
  const MyComp: React.SFC = () => (<div></div>);
  const driver = element => {
    return {
      exists: () => !!element
    };
  };

  it('vanilla should exist', () => {
    expect(isTestkitExists(<MyComp/>, testkitFactoryCreator(driver))).toEqual(true);
  });

  it('enzyme should exist', () => {
    expect(isEnzymeTestkitExists(<MyComp/>, enzymeTestkitFactoryCreator(driver))).toEqual(true);
  });
});
