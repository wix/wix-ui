/* global describe it expect jest */
import * as React from 'react';
import {Menu} from './menu';
import {MenuItem} from '../menu-item/menu-item';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {menuItemPrivateDriverFactory} from './menu.driver.private';

const createDriver = new ReactDOMTestContainer()
  .unmountAfterEachTest()
  .createUniRenderer(menuItemPrivateDriverFactory);

describe('Menu', () => {
  it('should render', async () => {
    const driver = createDriver(<Menu />);
    expect(await driver.exists()).toBeTruthy();
  });

  it('should have Menu as displayName', () => {
    expect(Menu.displayName).toBe('Menu');
  });

  it('should have Item static property which refers to MenuItem component', () => {
    expect(Menu.Item).toEqual(MenuItem);
  });

  describe('`children` prop', () => {
    it('should render MenuItem components', async () => {
      const children = [
        <Menu.Item key="first">first</Menu.Item>,
        <Menu.Item key="second">second</Menu.Item>
      ];
      const driver = createDriver(<Menu children={children} />);
      expect(await driver.assertChildren()).toBeTruthy();
    });

    it('should not render not MenuItem components', async () => {
      const children = [
        <Menu.Item key="first">first</Menu.Item>,
        'hello',
        <Menu.Item key="second">second</Menu.Item>
      ];
      // @ts-ignore: test case for non ts consumers who pass unexpected children
      const driver = createDriver(<Menu children={children} />);
      expect(await driver.assertChildren()).toBeTruthy();
    });
  });
});
