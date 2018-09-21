/* global describe it expect */
import * as React from 'react';
import {MenuItem} from './menu-item';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {menuItemDriverFactory} from './menu-item.driver';

const createDriver = new ReactDOMTestContainer()
  .unmountAfterEachTest()
  .createUniRenderer(menuItemDriverFactory);

describe('MenuItem', () => {
  it('should render', async () => {
    const driver = createDriver(<MenuItem />);
    expect(await driver.exists()).toBeTruthy();
  });
});
