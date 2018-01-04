import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {dropdownDriverFactory} from './Dropdown.driver';
import Dropdown from './index';
import {HOVER, CLICK} from './constants';
import Divider from '../Divider';

describe ('Dropdown', () => {
  const createDriver = createDriverFactory(dropdownDriverFactory);
  const options = [1, 2, 3, 4, 5].map(x => ({
    id: x,
    isSelectable: x !== 3,
    isDisabled: x === 4,
    render: () => x === 3 ? <Divider /> : <span>{`value${x}`}</span>
  }));

  const createDropdown = (props = {}) => (
    <Dropdown {...Object.assign({
      options: [],
      openTrigger: CLICK,
      placement: 'bottom',
      onSelect: () => null,
      onDeselect: () => null,
      initialSelectedIds: [],
      closeOnSelect: true
    }, props)}>
      {() => ''}
    </Dropdown>
  );

  it('should render default dropdown', () => {
    const driver = createDriver(createDropdown());

    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  describe('openTrigger', () => {
    it('should show content on click', () => {
      const driver = createDriver(createDropdown());

      driver.click();
      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it('should show content on hover', () => {
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
      expect(onSelect).toHaveBeenCalledWith(options[0]);
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
      const driver = createDriver(createDropdown({options, onSelect, onDeselect, closeOnSelect: false}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onSelect).toHaveBeenCalledWith(options[0]);
    });

    it('should call onSelect when selection is not empty then changed', () => {
      const onSelect = jest.fn();
      const onDeselect = jest.fn();
      const driver = createDriver(createDropdown({initialSelectedIds: [1], options, onSelect, onDeselect, closeOnSelect: false}));

      driver.click();
      driver.clickOptionAt(1);
      expect(onSelect).toHaveBeenCalledWith(options[1]);
    });

    it('should call onDeselect when selection is changed', () => {
      const onSelect = jest.fn();
      const onDeselect = jest.fn();
      const driver = createDriver(createDropdown({initialSelectedIds: [1], options, onSelect, onDeselect, closeOnSelect: false}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onDeselect).toHaveBeenCalledWith(options[0]);
    });
  });
});
