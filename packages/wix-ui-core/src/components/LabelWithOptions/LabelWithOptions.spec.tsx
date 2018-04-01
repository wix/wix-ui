import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {labelWithOptionsDriverFactory} from './labelWithOptions.driver';
import {LabelWithOptions} from './';
import {generateOptions} from '../../baseComponents/DropdownOption/OptionsExample';

describe('LabelWithOptions', () => {
  const createDriver = createDriverFactory(labelWithOptionsDriverFactory);
  const options = generateOptions();
  const createLabelWithOptions = props => (
    <LabelWithOptions
      renderSuffix={isInvalid => (
        <div data-hook="suffix">{isInvalid ? 'error!' : 'no errors'}</div>
      )}
      {...props}/>
  );

  it('should render the label in default state', () => {
    const driver = createDriver(createLabelWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
    expect(driver.isRequired()).toBeFalsy();
    expect(driver.getSuffix().innerHTML).toEqual('no errors');
  });

  it('should display dropdown when open', () => {
    const driver = createDriver(createLabelWithOptions({options, forceContentElementVisibility: true}));
    expect(driver.isContentElementExists()).toBeTruthy();
  });

  it('should pass options to dropdown', () => {
    const driver = createDriver(createLabelWithOptions({options, forceContentElementVisibility: true}));
    expect(driver.getOptionsCount()).toEqual(options.length);
  });

  describe('when no value is selected', () => {
    it('should show default value', () => {
      const selectedOptions = [options[0], options[1]];
      const driver = createDriver(createLabelWithOptions({
        options,
        initialSelectedIds: selectedOptions.map(option => option.id),
      }));
      const expectedLabelText = selectedOptions.map(option => option.value).join(', ');
      expect(driver.getLabelText()).toEqual(expectedLabelText);
    });

    it('should show placeholder if there\'s no default', () => {
      const placeholder = 'Please select an item';
      const driver = createDriver(createLabelWithOptions({
        options: [],
        placeholder,
      }));
      expect(driver.getLabelText()).toEqual(placeholder);
    });
  });

  describe('when clicking label', () => {
    let driver;

    beforeEach(() => {
      driver = createDriver(createLabelWithOptions({options}));
      driver.clickLabel();
    });

    it('should open dropdown', () => {
      expect(driver.isContentElementExists()).toBeTruthy();
    });
  });

  describe('when disabled', () => {
    let driver;

    beforeEach(() => {
      driver = createDriver(createLabelWithOptions({options, disabled: true}));
    });

    it('should not allow opening dropdown', () => {
      driver.clickLabel();
      expect(driver.isContentElementExists()).toBeFalsy();
    });

    it('should apply disabled style to label', () => {
      expect(driver.isDisabled()).toBeTruthy();
    });
  });

  describe('when hitting Arrow Down key', () => {
    let driver;

    beforeEach(() => {
      driver = createDriver(createLabelWithOptions({options}));
      driver.arrowDown();
    });

    it('should open dropdown if closed', () => {
      expect(driver.isContentElementExists()).toBeTruthy();
    });
  });

  describe('when selecting options', () => {
    it('should display selected options in label', () => {
      const driver = createDriver(createLabelWithOptions({
        options
      }));
      const selectedOptions = [options[0], options[4]];
      driver.click();
      driver.optionAt(0).click();
      driver.optionAt(4).click();
      const expectedLabelText = selectedOptions.map(option => option.value).join(', ');
      expect(driver.getLabelText()).toEqual(expectedLabelText);
    });

    it('should call onSelect', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createLabelWithOptions({
        options,
        onSelect,
        forceContentElementVisibility: true,
      }));
      driver.optionAt(0).click();
      expect(onSelect).toHaveBeenCalledWith(options[0]);
    });
  });

  describe('when deselecting options', () => {
    it('should display updated options in label', () => {
      const selectedOptions = [options[0], options[1]];
      const driver = createDriver(createLabelWithOptions({
        options,
        initialSelectedIds: selectedOptions.map(option => option.id)
      }));
      driver.click();
      driver.optionAt(0).click();
      const expectedLabelText = selectedOptions[1].value;
      expect(driver.getLabelText()).toEqual(expectedLabelText);
    });

    it('should call onDeselect', () => {
      const onDeselect = jest.fn();
      const driver = createDriver(createLabelWithOptions({
        options,
        onDeselect,
        initialSelectedIds: [0],
        forceContentElementVisibility: true,
      }));
      driver.optionAt(0).click();
      expect(onDeselect).toHaveBeenCalledWith(options[0]);
    });
  });

  describe('when selection is required', () => {
    let driver;

    beforeEach(() => {
      driver = createDriver(createLabelWithOptions({
        options,
        required: true,
      }));
    });

    it('should be displayed as required', () => {
      expect(driver.isRequired()).toBeTruthy();
    });

    it('should not be invalid', () => {
      expect(driver.isInvalid()).toBeFalsy();
    });
  });

  describe('when invalid', () => {
    let driver;
    beforeEach(() => {
      driver = createDriver(createLabelWithOptions({
        options,
        required: true,
        initialSelectedIds: [0, 1],
        forceContentElementVisibility:
          true,
      }))
      ;
      driver.optionAt(0).click();
      driver.optionAt(1).click();
    });

    it('should apply invalid style', () => {
      expect(driver.isInvalid()).toBeTruthy();
    });

    it('should render suffix with error', () => {
      expect(driver.getSuffix().innerHTML).toEqual('error!');
    });
  });
});
