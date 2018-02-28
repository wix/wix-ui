import * as React from 'react';
import {dropdownContentDriverFactory} from './DropdownContent.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {sleep} from 'wix-ui-test-utils/react-helpers';
import {OptionFactory} from '../DropdownOption';
import {DropdownContent} from './';

describe('DropdownContent', () => {
  const createDriver = createDriverFactory(dropdownContentDriverFactory);
  const options =
    Array.from(Array(5))
      .map((x, index) =>
        index === 2 ? OptionFactory.createDivider() : OptionFactory.create(index, index === 3, true, `value${index}`));

  const createDropdownContent = (props = {}) => (
    <DropdownContent {...Object.assign({
      options: [],
      onOptionClick: () => null,
      selectedIds: []
    }, props)}/>
  );

  it('should render default dropdown content', () => {
    const driver = createDriver(createDropdownContent());
    expect(driver.exists()).toBeTruthy();
  });

  describe('mouse events', () => {
    it('should select selectable options', () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(createDropdownContent({options, onOptionClick}));

      driver.optionAt(0).click();
      expect(onOptionClick).toHaveBeenCalledWith(options[0]);

      driver.optionAt(1).click();
      expect(onOptionClick).toHaveBeenCalledWith(options[1]);

      driver.optionAt(4).click();
      expect(onOptionClick).toHaveBeenCalledWith(options[4]);
    });

    it('should not select non selectable options', () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(createDropdownContent({options, onOptionClick}));

      driver.optionAt(2).click();
      expect(onOptionClick).not.toHaveBeenCalled();

      driver.optionAt(3).click();
      expect(onOptionClick).not.toHaveBeenCalled();
    });
  });
});
