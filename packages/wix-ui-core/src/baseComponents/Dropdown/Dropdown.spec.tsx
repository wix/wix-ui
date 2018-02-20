import * as React from 'react';
import * as eventually from 'wix-eventually';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {dropdownDriverFactory} from './Dropdown.driver';
import {Dropdown} from './';
import {HOVER, CLICK} from './constants';
import {OptionFactory} from '../DropdownOption';
import {mount} from 'enzyme';
import {Simulate} from 'react-dom/test-utils';

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
      <span>Dropdown</span>
    </Dropdown>
  );

  it('should render default dropdown', () => {
    const driver = createDriver(createDropdown());

    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  describe('openTrigger', () => {
    it('should show content on click', () => {
      const driver = createDriver(createDropdown({options}));

      driver.click();
      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it('should show content on hover', async () => {
      const driver = createDriver(createDropdown({options, openTrigger: HOVER}));

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

  describe('Dropdown content edge cases', () => {
    it('should not open dropdown content if options list is empty', () => {
      const driver = createDriver(createDropdown({options: []}));

      driver.click();

      expect(driver.isContentElementExists()).toBeFalsy();
    });

    it('should open dropdown content if options list is empty and fixedHeader exists', () => {
      const driver = createDriver(createDropdown({options: [], fixedHeader: 'Fixed'}));

      driver.click();

      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it('should open dropdown content if options list is empty and fixedFooter exists', () => {
      const driver = createDriver(createDropdown({options: [], fixedFooter: 'Fixed'}));

      driver.click();

      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it('Should display options when they exist', () => {
      const wrapper = mount(<Dropdown
        closeOnSelect={true}
        onSelect={() => null}
        initialSelectedIds={[]}
        onDeselect={() => null}
        placement="top"
        openTrigger={CLICK}
        options={[]}>
        <span>Dropdown</span>
      </Dropdown>);

      const driver = dropdownDriverFactory({
        element: wrapper.children().at(0).getDOMNode(),
        eventTrigger: Simulate});

      driver.click();
      expect(driver.isContentElementExists()).toBeFalsy();

      wrapper.setProps({options});
      expect(driver.isContentElementExists()).toBeTruthy();
    });
  });
});
