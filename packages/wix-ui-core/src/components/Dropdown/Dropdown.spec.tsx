import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {dropdownDriverFactory} from './Dropdown.driver';
import Dropdown from './index';
import {HOVER, MULTI_SELECT} from './Dropdown';

describe ('Dropdown', () => {
  const createDriver = createDriverFactory(dropdownDriverFactory);
  const createDropdown = (props = {}) =>
    <Dropdown {...props}>
      {({selectedOptions}) => <span>{selectedOptions.map(x => x.displayName).join() || 'Select option'}</span>}
    </Dropdown>;

    const options = [1, 2, 3, 4, 5].map(x => ({
      id: x,
      value: `value${x}`,
      displayName: `value ${x}`,
      type: x === 3 ? 'separator' : 'option',
      isDisabled: x === 4
    }));

  it ('should render dropdown default dropdown', () => {
    const driver = createDriver(createDropdown());

    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  describe('openTrigger', () => {
    it ('should show content on click', () => {
      const driver = createDriver(createDropdown());

      driver.click();
      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it ('should show content on on hover', () => {
      const driver = createDriver(createDropdown({openTrigger: HOVER}));

      driver.mouseEnter();
      expect(driver.isContentElementExists()).toBeTruthy();
      driver.mouseLeave();
      expect(driver.isContentElementExists()).toBeFalsy();
    });
  });

  describe('options', () => {
    it('should display selected option', () => {
      const driver = createDriver(createDropdown({options}));

      driver.click();
      driver.clickOptionAt(0);
      expect(driver.targetText()).toEqual('value 1');

      driver.click();
      driver.clickOptionAt(1);
      expect(driver.targetText()).toEqual('value 2');

      driver.click();
      driver.clickOptionAt(2); // Separator, do nothing
      driver.clickOptionAt(3); // Disabled, do nothing
      driver.clickOptionAt(4);
      expect(driver.targetText()).toEqual('value 5');
    });
  });

  describe('selectedId', () => {
    it('should display selected option with initial null value', () => {
      const driver = createDriver(createDropdown({options, selectedId: null}));
      expect(driver.targetText()).toEqual('Select option');
    });

    it('should display selected option with initial value', () => {
      const driver = createDriver(createDropdown({options, selectedId: 5}));
      expect(driver.targetText()).toEqual('value 5');
    });

    it('should display selected option with initial invalid value', () => {
      const driver = createDriver(createDropdown({options, selectedId: 6}));
      expect(driver.targetText()).toEqual('Select option');
    });
  });

  describe('selectedIds', () => {
    it('should display selected options with single initial value', () => {
      const driver = createDriver(createDropdown({options, selectedIds: [1]}));
      expect(driver.targetText()).toEqual('value 1');
    });

    it('should display selected options with initial value', () => {
      const driver = createDriver(createDropdown({options, selectedIds: [1, 5]}));
      expect(driver.targetText()).toEqual('value 1,value 5');
    });

    it('should display selected options with initial value one invalid index', () => {
      const driver = createDriver(createDropdown({options, selectedIds: [1, 6]}));
      expect(driver.targetText()).toEqual('value 1');
    });

    it('should display selected options with initial empty value', () => {
      const driver = createDriver(createDropdown({options, selectedIds: []}));
      expect(driver.targetText()).toEqual('Select option');
    });

    it('should display selected options with initial null value', () => {
      const driver = createDriver(createDropdown({options, selectedIds: null}));
      expect(driver.targetText()).toEqual('Select option');
    });
  });

  describe('onSelect', () => {
    it('should be called when selection changed', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onSelect).toHaveBeenCalled();
    });
  });

  describe('multiSelect', () => {
    it('should select multiple options', () => {
      const driver = createDriver(createDropdown({options, mode: MULTI_SELECT}));

      driver.click();
      driver.clickOptionAt(0);
      driver.clickOptionAt(1);

      expect(driver.targetText()).toEqual('value 1,value 2');
      driver.clickOptionAt(1);
      expect(driver.targetText()).toEqual('value 1');
    });

    it('should trigger onDeselect', () => {
      const onDeselect = jest.fn();
      const driver = createDriver(createDropdown({options, mode: MULTI_SELECT, onDeselect}));

      driver.click();
      driver.clickOptionAt(0);
      driver.clickOptionAt(0);
      expect(onDeselect).toHaveBeenCalled();
    });
  });
});
