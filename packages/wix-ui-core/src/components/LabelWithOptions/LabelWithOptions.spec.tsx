import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {labelWithOptionsDriverFactory} from './LabelWithOptions.driver';
import {LabelWithOptions} from './';
import {generateOptions} from '../../baseComponents/DropdownOption/OptionsExample';
import {labelWithOptionsTestkitFactory} from '../../testkit';
import {labelWithOptionsTestkitFactory as enzymeLabelWithOptionsTestkitFactory} from '../../testkit/enzyme';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {mount} from 'enzyme';

describe('LabelWithOptions', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(labelWithOptionsDriverFactory);

  const options = generateOptions();
  const createLabelWithOptions = props => (
    <LabelWithOptions
      renderSuffix={isError => (
        <div data-hook="suffix">{isError ? 'error!' : 'no errors'}</div>
      )}
      {...props}
    />
  );

  it('should render the label in default state', () => {
    const driver = createDriver(createLabelWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
    expect(driver.isRequired()).toBeFalsy();
    expect(driver.getSuffix().innerHTML).toEqual('no errors');
  });

  it('should display dropdown when open', () => {
    const driver = createDriver(createLabelWithOptions({options}));
    driver.click();
    expect(driver.isContentElementExists()).toBeTruthy();
  });

  it('should pass options to dropdown', () => {
    const driver = createDriver(createLabelWithOptions({options}));
    driver.click();
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
      driver.click();
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
      driver.click();
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
      driver.keyDown('ArrowDown');
    });

    it('should open dropdown if closed', () => {
      expect(driver.isContentElementExists()).toBeTruthy();
    });
  });

  describe('when selecting options', () => {
    it('should display selected options in label', () => {
      const driver = createDriver(createLabelWithOptions({
        options,
        multi: true
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
      const driver = createDriver(createLabelWithOptions({options, onSelect}));
      driver.click();
      driver.optionAt(0).click();
      expect(onSelect).toHaveBeenCalledWith(options[0]);
    });

    it('allows picking only one option when multi prop is false', () => {
      const driver = createDriver(<LabelWithOptions options={generateOptions()} multi={false}/>);
      driver.click();
      driver.optionAt(0).click();
      driver.click();
      driver.optionAt(4).click();
      expect(driver.getLabelText()).toEqual(options[4].value);
    });
  });

  describe('when deselecting options', () => {
    it('should display updated options in label', () => {
      const selectedOptions = [options[0], options[1]];
      const driver = createDriver(createLabelWithOptions({
        options,
        multi: true,
        initialSelectedIds: selectedOptions.map(option => option.id)
      }));
      driver.click();
      driver.optionAt(0).click();
      const expectedLabelText = selectedOptions[1].value;
      expect(driver.getLabelText()).toEqual(expectedLabelText);
    });

    it('should call onDeselect', () => {
      const onDeselect = jest.fn();
      const driver = createDriver(createLabelWithOptions({options, multi: true, onDeselect, initialSelectedIds: [0]}));
      driver.click();
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

    it('should not be error', () => {
      expect(driver.isError()).toBeFalsy();
    });
  });

  describe('when invalid', () => {
    let driver;
    beforeEach(() => {
      driver = createDriver(createLabelWithOptions({options, multi: true, required: true, initialSelectedIds: [0, 1]}));
      driver.click();
      driver.optionAt(0).click();
      driver.optionAt(1).click();
    });

    it('should apply error style', () => {
      expect(driver.isError()).toBeTruthy();
    });

    it('should render suffix with error', () => {
      expect(driver.getSuffix().innerHTML).toEqual('error!');
    });
  });

  describe('checkbox', () => {
    it('displays a checkbox when given the prop', () => {
      const driver = createDriver(<LabelWithOptions checkbox options={generateOptions()} />);

      driver.click();
      expect(driver.checkboxDriverAt(0).exists()).toBe(true);
    });

    it('does not display a checkbox next to a non selectable item', () => {
      const driver = createDriver(<LabelWithOptions checkbox options={[{id: 'fake', value: 'bla', isSelectable: false, isDisabled: false, render: () => <span>bla</span>}]} />);

      driver.click();
      expect(driver.checkboxDriverAt(0).exists()).toBe(false);
    });

    it('marks the checkbox as checked when an option is selected', () => {
      const driver = createDriver(<LabelWithOptions checkbox multi options={generateOptions()} />);

      driver.click();
      driver.optionAt(0).click();
      expect(driver.checkboxDriverAt(0).isChecked()).toBe(true);
    });

    it('marks the checkbox as disabled if the option is disabled', () => {
      const driver = createDriver(<LabelWithOptions checkbox options={[{id: 'test', value: 'test', isSelectable: true, isDisabled: true, render: () => <span>test</span>}]} />);

      driver.click();
      expect(driver.checkboxDriverAt(0).isDisabled()).toBe(true);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<LabelWithOptions options={[]}/>, labelWithOptionsTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<LabelWithOptions options={[]}/>, enzymeLabelWithOptionsTestkitFactory, mount)).toBe(true);
    });
  });
});
