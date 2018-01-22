import * as React from 'react';
import {dropdownContentDriverFactory} from './DropdownContent.driver';
import {createDriverFactory, sleep} from 'wix-ui-test-utils';
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
      maxHeight: 150,
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

  describe('keyboardEvent', () => {
    it('should move down when ArrowDown is sent', async () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(createDropdownContent({options, onOptionClick}));
      driver.onKeyDown('ArrowDown');
      await sleep(10);

      expect(driver.optionAt(0).containsClass('Hover')).toBeTruthy();
    });

    it('should move to last when ArrowUp is sent', async () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(createDropdownContent({options, onOptionClick}));
      driver.onKeyDown('ArrowUp');
      await sleep(10);

      expect(driver.optionAt(4).containsClass('Hover')).toBeTruthy();
    });

    it('should not hover over seperator with arrow up', async () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(createDropdownContent({options: [options[2]], onOptionClick}));
      driver.onKeyDown('ArrowUp');
      await sleep(10);

      expect(driver.optionAt(0).containsClass('Hover')).toBeFalsy();
    });

    it('should not hover over seperator with arrow down', async () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(createDropdownContent({options: [options[2]], onOptionClick}));
      driver.onKeyDown('ArrowDown');
      await sleep(10);

      expect(driver.optionAt(0).containsClass('Hover')).toBeFalsy();
    });
  });
});
