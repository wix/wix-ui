import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {dropdownDriverFactory} from './Dropdown.driver';
import Dropdown from './index';
import {HOVER, MULTI_SELECT} from './constants';

describe ('Dropdown', () => {
  const getTargetText = driver => driver.targetElement().innerHTML;
  const createDriver = createDriverFactory(dropdownDriverFactory);
  const createDropdown = (props = {}) =>
    <Dropdown {...props}>
      {({selectedOptions}) => selectedOptions.map(x => x.displayName).join() || 'Select option'}
    </Dropdown>;

    const options = [1, 2, 3, 4, 5].map(x => ({
      id: x,
      value: `value${x}`,
      displayName: `value ${x}`,
      type: x === 3 ? 'separator' : 'option',
      isDisabled: x === 4
    }));

  it ('should render default dropdown', () => {
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

    it ('should show content on hover', () => {
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
      expect(getTargetText(driver)).toEqual('value 1');

      driver.click();
      driver.clickOptionAt(1);
      expect(getTargetText(driver)).toEqual('value 2');

      driver.click();
      driver.clickOptionAt(2); // Separator, do nothing
      expect(getTargetText(driver)).toEqual('value 2');
      driver.clickOptionAt(3); // Disabled, do nothing
      expect(getTargetText(driver)).toEqual('value 2');
      driver.clickOptionAt(4);
      expect(getTargetText(driver)).toEqual('value 5');
    });
  });

  describe('selectedId', () => {
    it('should initialize dropdown without selected when selected id is null', () => {
      const driver = createDriver(createDropdown({options, selectedId: null}));
      expect(getTargetText(driver)).toEqual('Select option');
    });

    it('should initialize dropdown with selected item', () => {
      const driver = createDriver(createDropdown({options, selectedId: 5}));
      expect(getTargetText(driver)).toEqual('value 5');
    });

    it('should initialize dropdown without selected when selected id is not present', () => {
      const driver = createDriver(createDropdown({options, selectedId: 6}));
      expect(getTargetText(driver)).toEqual('Select option');
    });
  });

  describe('selectedIds', () => {
    it('should initialize dropdown with selected with selected option', () => {
      const driver = createDriver(createDropdown({options, selectedIds: [1]}));
      expect(getTargetText(driver)).toEqual('value 1');
    });

    it('should initialize dropdown with selected with multiple selected options', () => {
      const driver = createDriver(createDropdown({options, selectedIds: [1, 5]}));
      expect(getTargetText(driver)).toEqual('value 1,value 5');
    });

    it('should initialize dropdown with selected options that are present', () => {
      const driver = createDriver(createDropdown({options, selectedIds: [1, 6]}));
      expect(getTargetText(driver)).toEqual('value 1');
    });

    it('should initialize dropdown without selected options when empty', () => {
      const driver = createDriver(createDropdown({options, selectedIds: []}));
      expect(getTargetText(driver)).toEqual('Select option');
    });

    it('should initialize dropdown without selected options when null', () => {
      const driver = createDriver(createDropdown({options, selectedIds: null}));
      expect(getTargetText(driver)).toEqual('Select option');
    });
  });

  describe('onSelect', () => {
    it('should be called when selection changed', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onSelect).toHaveBeenCalledWith(options[0], expect.any(Object));
    });

    it('should not be called when selecting disabled option', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect}));

      driver.click();
      driver.clickOptionAt(2);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should not be called when selecting separator', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect}));

      driver.click();
      driver.clickOptionAt(3);
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('multiSelect', () => {
    it('should select multiple options', () => {
      const driver = createDriver(createDropdown({options, mode: MULTI_SELECT}));

      driver.click();
      driver.clickOptionAt(0);
      driver.clickOptionAt(1);

      expect(getTargetText(driver)).toEqual('value 1,value 2');
      driver.clickOptionAt(1);
      expect(getTargetText(driver)).toEqual('value 1');
    });

    it('should trigger onDeselect', () => {
      const onDeselect = jest.fn();
      const driver = createDriver(createDropdown({options, mode: MULTI_SELECT, onDeselect}));

      driver.click();
      driver.clickOptionAt(0);
      driver.clickOptionAt(0);
      expect(onDeselect).toHaveBeenCalledWith(options[0], expect.any(Object));
    });
  });
});
