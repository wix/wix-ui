import * as React from 'react';
import {DropdownOption, Option} from './';
import {dropdownOptionDriverFactory} from './DropdownOption.driver';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {sleep} from 'wix-ui-test-utils/react-helpers';

describe('DropdownOption', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(dropdownOptionDriverFactory);

  const onClickHandler = jest.fn();
  const onMouseEnterHandler = jest.fn();

  const createOption = (isDisabled = false) => ({
    id: 1,
    isDisabled,
    isSelectable: !isDisabled,
    value: 'value',
    render: () => 'value'
  });

  const createDropdownOption = (option: Option) => (
    <DropdownOption
      option={option}
      isHovered
      isSelected
      onClickHandler={onClickHandler}
      className="className"
      onMouseEnterHandler={onMouseEnterHandler}
    />
  );

  it('should render default component', () => {
    const option = createOption();
    const driver = createDriver(createDropdownOption(option));
    expect(driver.exists()).toBeTruthy();
    expect(driver.className()).toContain('className');
  });

  it('should call on click handler', () => {
    const option = createOption();
    const driver = createDriver(createDropdownOption(option));
    driver.click();
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('should call on mouse enter handler', () => {
    const option = createOption();
    const driver = createDriver(createDropdownOption(option));
    driver.mouseEnter();
    expect(onMouseEnterHandler).toHaveBeenCalled();
  });

  it('should be hovered and selected but not disabled', () => {
    const option = createOption();
    const driver = createDriver(createDropdownOption(option));
    expect(driver.isHovered()).toBeTruthy();
    expect(driver.isSelected()).toBeTruthy();
    expect(driver.isDisabled()).toBeFalsy();
  });

  it('should be disabled and not hovered and selected data attributes', () => {
    const option = createOption(true);
    const driver = createDriver(createDropdownOption(option));
    expect(driver.isHovered()).toBeFalsy();
    expect(driver.isSelected()).toBeFalsy();
    expect(driver.isDisabled()).toBeTruthy();
  });
});
