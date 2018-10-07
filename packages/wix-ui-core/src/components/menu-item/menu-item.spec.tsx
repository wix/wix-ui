import * as React from 'react';
import {MenuItem} from './menu-item';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {menuItemDriverFactory} from './menu-item.driver';

const createDriver = new ReactDOMTestContainer()
  .unmountAfterEachTest()
  .createUniRenderer(menuItemDriverFactory);

describe('MenuItem', () => {
  describe('`children` prop', () => {
    it('should be rendered', async () => {
      const driver = createDriver(<MenuItem>hello</MenuItem>);
      expect(await driver.getText()).toEqual('hello');
    });
  });

  describe('`onSelect` prop', () => {
    it('should be invoked on click', async () => {
      const onSelect = jest.fn();
      const driver = createDriver(
        <MenuItem onSelect={onSelect}>hello</MenuItem>
      );
      await driver.click();
      expect(onSelect.mock.calls.length).toEqual(1);
    });

    it('should not be invoked on click when disabled', async () => {
      const onSelect = jest.fn();
      const driver = createDriver(
        <MenuItem onSelect={onSelect} disabled>hello</MenuItem>
      );
      await driver.click();
      expect(onSelect.mock.calls.length).toEqual(0);
    });
  });

  [
    ['selected', 'isSelected'],
    ['highlighted', 'isHighlighted'],
    ['disabled', 'isDisabled']
  ].map(([prop, method]) =>
    describe(`\`${prop}\` prop`, async () => {
      it('should be false by default', async () => {
        const driver = createDriver(<MenuItem>hello</MenuItem>);
        expect(await driver[method]()).toBe(false);
      });

      it('should set state when true', async () => {
        const driver = createDriver(
          <MenuItem {...{[prop]: true}}>hello</MenuItem>
        );
        expect(await driver[method]()).toBe(true);
      });
    })
  );
});
