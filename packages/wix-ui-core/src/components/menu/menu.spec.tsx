import * as React from 'react';
import {Menu} from './menu';
import {MenuItem} from '../menu-item/menu-item';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {menuItemPrivateDriverFactory} from './menu.driver.private';

const createDriver = new ReactDOMTestContainer()
  .unmountAfterEachTest()
  .createUniRenderer(menuItemPrivateDriverFactory);

describe('Menu', () => {
  it('should have Menu as displayName', () => {
    expect(Menu.displayName).toBe('Menu');
  });

  it('should have Item static property which refers to MenuItem component', () => {
    expect(Menu.Item).toEqual(MenuItem);
  });

  describe('`children` prop', () => {
    it('should render MenuItem components', async () => {
      const driver = createDriver(
        <Menu>
          <Menu.Item>first</Menu.Item>
          <Menu.Item>second</Menu.Item>
        </Menu>
      );
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

  describe('`onChange` prop', () => {
    it('should be invoked when clicking MenuItem child', async () => {
      const onChange = jest.fn();
      const driver = createDriver(
        <Menu onChange={onChange}>
          <Menu.Item>first</Menu.Item>
          <Menu.Item>second</Menu.Item>
        </Menu>
      );
      await driver.clickItemAtIndex(0);
      expect(onChange.mock.calls.length).toBe(1);
    });

    it('should be invoked with MenuItem props', async () => {
      const onChange = jest.fn();
      const driver = createDriver(
        <Menu onChange={onChange}>
          <Menu.Item selected disabled highlighted children="batman" />
        </Menu>
      );
      await driver.clickItemAtIndex(0);

      expect(onChange.mock.calls[0][0]).toMatchObject({
        selected: true,
        disabled: true,
        highlighted: true,
        children: 'batman'
      });
    });
  });
});
