/* global describe it expect jest */
import * as React from 'react';
import {MenuItem} from './menu-item';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {menuItemPrivateDriverFactory} from './menu-item.driver.private';

const createDriver = new ReactDOMTestContainer()
  .unmountAfterEachTest()
  .createUniRenderer(menuItemPrivateDriverFactory);

describe('MenuItem', () => {
  it('should render', async () => {
    const driver = createDriver(<MenuItem />);
    expect(await driver.exists()).toBeTruthy();
  });

  it('should have Menu.Item as displayName', () => {
    expect(MenuItem.displayName).toBe('Menu.Item');
  });

  describe('`children` prop', () => {
    it('should be rendered', async () => {
      const driver = createDriver(<MenuItem children="hello" />);
      expect(await driver.getText()).toEqual('hello');
    });
  });

  describe('`onClick` prop', () => {
    it('should be invoked on click', async () => {
      const onClick = jest.fn();
      const driver = createDriver(
        <MenuItem children="hello" onClick={onClick} />
      );
      await driver.click();
      expect(onClick.mock.calls.length).toEqual(1);
    });
  });
});
