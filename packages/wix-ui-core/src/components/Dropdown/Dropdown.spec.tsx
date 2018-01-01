import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {dropdownDriverFactory} from './Dropdown.driver';
import Dropdown from './index';
import {HOVER, MULTI_SELECT, SEPARATOR, OPTION} from './constants';

describe ('Dropdown', () => {
  const createDriver = createDriverFactory(dropdownDriverFactory);
  const options = [1, 2, 3, 4, 5].map(x => ({
    id: x,
    value: `value${x}`,
    displayName: `value ${x}`,
    type: x === 3 ? SEPARATOR : OPTION,
    isDisabled: x === 4
  }));

  const createDropdown = (props = {}) => (
    <Dropdown {...props}>
      {() => ''}
    </Dropdown>
  );

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

  describe('onSelect', () => {
    it('should be called when selection changed', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onSelect).toHaveBeenCalledWith(options[0], expect.any(Object));
    });

    it('should not be called when selecting disabled item', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect}));

      driver.click();
      driver.clickOptionAt(2);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should not be called when selecting separator item', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect}));

      driver.click();
      driver.clickOptionAt(3);
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('multiSelect', () => {
    it('should call onSelect when selection is empty then changed', () => {
      const onSelect = jest.fn();
      const onDeselect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect, onDeselect, mode: MULTI_SELECT}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onSelect).toHaveBeenCalledWith(options[0], expect.any(Object));
    });

    it('should call onSelect when selection is not empty then changed', () => {
      const onSelect = jest.fn();
      const onDeselect = jest.fn();
      const driver = createDriver(createDropdown({selectedIds: [1], options, onSelect, onDeselect, mode: MULTI_SELECT}));

      driver.click();
      driver.clickOptionAt(1);
      expect(onSelect).toHaveBeenCalledWith(options[1], expect.any(Object));
    });

    it('should call onDeselect when selection is changed', () => {
      const onSelect = jest.fn();
      const onDeselect = jest.fn();
      const driver = createDriver(createDropdown({selectedIds: [1], options, onSelect, onDeselect, mode: MULTI_SELECT}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onDeselect).toHaveBeenCalledWith(options[0], expect.any(Object));
    });
  });
});
