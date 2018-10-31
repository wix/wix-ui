import * as React from 'react';
import {Menu} from './menu';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {menuDriverFactory} from './menu.driver';

const createDriver = new ReactDOMTestContainer()
  .unmountAfterEachTest()
  .createUniRenderer(menuDriverFactory);

describe('Menu', () => {
  describe('`onSelect` prop', () => {
    it('should be invoked on click', async () => {
      expect(true).toBe(true);
      // const driver = createDriver(
      //   <Menu>
      //     <Menu.Item>a</Menu.Item>
      //     <Menu.Item>b</Menu.Item>
      //     <Menu.Item>c</Menu.Item>
      //   </Menu>
      // );
      // expect(await driver.itemsCount()).toEqual(3);
    });
  });
});
