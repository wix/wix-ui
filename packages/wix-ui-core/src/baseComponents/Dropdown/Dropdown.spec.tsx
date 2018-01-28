import * as React from 'react';
import * as eventually from 'wix-eventually';
import {createDriverFactory} from 'wix-ui-test-utils';
import {dropdownDriverFactory} from './Dropdown.driver';
import {Dropdown} from './';
import {HOVER, CLICK} from './constants';
import {OptionFactory} from '../DropdownOption';

describe('Dropdown', () => {
  const createDriver = createDriverFactory(dropdownDriverFactory);
  const options =
    Array.from(Array(5))
      .map((x, index) =>
        index === 2 ? OptionFactory.createDivider() : OptionFactory.create(index, index === 3, true, `value${index}`));

  const createDropdown = (props = {}) => (
    <Dropdown placement="top" openTrigger={CLICK} {...Object.assign({
      options: [],
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

    it('should show content on hover', async () => {
      const driver = createDriver(createDropdown({openTrigger: HOVER}));

      driver.mouseEnter();
      expect(driver.isContentElementExists()).toBeTruthy();
      driver.mouseLeave();
      await eventually(() => expect(driver.isContentElementExists()).toBeFalsy());
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

    it('should call onSelect when selection is empty then changed', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({options, onSelect, closeOnSelect: false}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onSelect).toHaveBeenCalledWith(options[0]);
    });
  });

  describe('onDeselect', () => {
    it('should call onDeselect when option is unselected', () => {
      const onDeselect = jest.fn();
      const driver = createDriver(createDropdown({initialSelectedIds: [0], options, onDeselect, closeOnSelect: false}));

      driver.click();
      driver.clickOptionAt(0);
      expect(onDeselect).toHaveBeenCalledWith(options[0]);
    });
  });
});
