import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {inputWithOptionsDriverFactory} from './InputWithOptions.driver';
import {InputWithOptions} from './';
import {generateOptions} from '../dropdown-option/OptionsExample';
import * as waitForCond from 'wait-for-cond';
import {mount} from 'enzyme';
import {Simulate} from 'react-dom/test-utils';
import {OptionFactory} from '../dropdown-option';

describe('InputWithOptions', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(inputWithOptionsDriverFactory);

  const options = generateOptions();
  const createInputWithOptions = (props = {}, inputProps = {}) => (
    <InputWithOptions 
      {...Object.assign({
        options: [],
        inputProps
      }, props)}
    />
  );

  it('should render default component', () => {
    const driver = createDriver(createInputWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  it('should display content element', () => {
    const driver = createDriver(createInputWithOptions({options, forceContentElementVisibility: true}));
    expect(driver.isContentElementExists()).toBeTruthy();
  });

  it('should trigger not onSelect by default, if item is selected', () => {
    const onSelect = jest.fn();

    const driver = createDriver(createInputWithOptions({options, onSelect}));
    driver.click();
    driver.optionAt(0).click();
    driver.click();
    driver.optionAt(0).click();

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should trigger onSelect even if item is selected, if allowReselect is set', () => {
    const onSelect = jest.fn();

    const driver = createDriver(createInputWithOptions({options, onSelect, allowReselect: true}));
    driver.click();
    driver.optionAt(0).click();
    driver.click();
    driver.optionAt(0).click();

    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('should not show options element upon blur', async () => {
    const onSelect = jest.fn();
    const driver = createDriver(createInputWithOptions({options, onSelect}));
    driver.click();
    await waitForCond(() => driver.isContentElementExists());
    driver.keyDown('ArrowDown');
    driver.keyDown('Enter');
    await waitForCond(() => !driver.isContentElementExists());
    driver.keyDown('Escape');
    await waitForCond.assertHold(() => {
      expect(driver.isContentElementExists()).toBeFalsy();
    }, 10);
  });

  it('Should support open() and close() methods', () => {
      const wrapper = mount(createInputWithOptions({options}));

      const driver = inputWithOptionsDriverFactory({
          element: wrapper.children().at(0).getDOMNode(),
          eventTrigger: Simulate
      });

      expect(driver.isContentElementExists()).toBeFalsy();
      (wrapper.instance() as any).open();
      expect(driver.isContentElementExists()).toBeTruthy();
      (wrapper.instance() as any).close();
      expect(driver.isContentElementExists()).toBeFalsy();
  });

  describe('Filter', () => {
    const numericOptions = [
      OptionFactory.create({id: 'a', value: 'a'}),
      OptionFactory.create({id: 'b', value: 'b'}),
      OptionFactory.create({id: 'c', value: 'c'}),
      OptionFactory.create({id: 'd', value: 'd'}),
    ];

    const setup = props => {
      const wrapper = mount(createInputWithOptions(props));
      const driver = inputWithOptionsDriverFactory({
        element: wrapper.children().at(0).getDOMNode(),
        eventTrigger: Simulate
      });
      return {wrapper, driver};
    };

    it('should filter by typed string by default', async () => {
      const props = {options: numericOptions, inputProps: {value: ''}};
      const {wrapper, driver} = setup(props);
      driver.click();
      expect(driver.getOptionsCount()).toBe(4);
      // Using keyDown in order to trigger isEditing mode
      driver.keyDown('a');
      wrapper.setProps({inputProps: {value: 'a'}});
      expect(driver.getOptionsCount()).toBe(1);
    });

    it('should support custom filtering', () => {
      const filterPredicate = (inputValue, optionValue) => optionValue === 'b' || optionValue === 'c';
      const props = {options: numericOptions, inputProps: {value: ''}, filterPredicate};
      const {wrapper, driver} = setup(props);
      driver.click();
      expect(driver.getOptionsCount()).toBe(4);
      // Using keyDown in order to trigger isEditing mode
      driver.keyDown('a');
      wrapper.setProps({inputProps: {value: 'a'}});
      expect(driver.getOptionsCount()).toBe(2);
      expect(driver.optionAt(0).getText()).toBe('b');
      expect(driver.optionAt(1).getText()).toBe('c');
    });
  })

  describe('Focus and blur events', () => {
    it('Should integrate focus event with inner input', () => {
      const onFocus = jest.fn();
      const driver = createDriver(createInputWithOptions({options}, { onFocus }));
      driver.focus();

      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('Should integrate blur event with inner input', () => {
      const onBlur = jest.fn();
      const driver = createDriver(createInputWithOptions({options}, { onBlur }));
      driver.blur();

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('onManualInput', () => {
    const onManualInput = jest.fn();
    const onSelect = jest.fn();

    const getDriver = (_options = options) => {
      return createDriver(createInputWithOptions({
        options: _options,
        onManualInput,
        onSelect,
        inputProps: { value: 'a' },
      }));
    }

    beforeEach(() => {
      onManualInput.mockReset();
      onSelect.mockReset();
    });

    it('should trigger onManualInput with the actual value on Enter key', () => {
      const driver = getDriver();

      driver.click();
      driver.keyDown('Enter');
      expect(onManualInput).toHaveBeenCalledWith('a');
      expect(onManualInput).toHaveBeenCalledTimes(1);
    });

    it('should trigger onManualInput with the actual value on Tab key', () => {
      const driver = getDriver();

      driver.click();
      driver.keyDown('Tab');
      expect(onManualInput).toHaveBeenCalledWith('a');
      expect(onManualInput).toHaveBeenCalledTimes(1);
    });

    it('should trigger onManualInput with the actual value on blur', () => {
      const driver = getDriver();

      // should not call onManualInput if onSelect has been triggered
      driver.click();
      driver.optionAt(0).click();
      expect(onSelect).toHaveBeenCalledWith(options[0]);
      driver.blur();
      expect(onManualInput).not.toHaveBeenCalled();

      // should call onManualInput once blurring a changed value
      driver.setValue('a');
      driver.keyDown('a');
      driver.blur();
      expect(onManualInput).toHaveBeenCalledWith('a');
      expect(onManualInput).toHaveBeenCalledTimes(1);
    });

    it('should trigger onManualInput with the actual value even if option list is empty', () => {
      const _options = [];
      const driver = getDriver(_options);

      driver.click();
      driver.keyDown('Enter');
      expect(onManualInput).toHaveBeenCalledWith('a');
      expect(onManualInput).toHaveBeenCalledTimes(1);
    });
  });
});
