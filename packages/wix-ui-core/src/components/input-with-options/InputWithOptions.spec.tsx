import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { inputWithOptionsDriverFactory } from './InputWithOptions.driver';
import { InputWithOptions } from './';
import { generateOptions } from '../dropdown-option/OptionsExample';
import * as waitForCond from 'wait-for-cond';
import { mount } from 'enzyme';
import { Simulate } from 'react-dom/test-utils';
import { OptionFactory } from '../dropdown-option';

describe('InputWithOptions', () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(inputWithOptionsDriverFactory);

  const options = generateOptions();
  const createInputWithOptions = (props = {}, inputProps = {}) => (
    <InputWithOptions
      {...{
        options: [],
        inputProps,
        ...props,
      }}
    />
  );

  it('should render default component', () => {
    const driver = createDriver(createInputWithOptions({ options }));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  it('should display content element', () => {
    const driver = createDriver(
      createInputWithOptions({ options, forceContentElementVisibility: true }),
    );
    expect(driver.isContentElementExists()).toBeTruthy();
  });

  it('should trigger not onSelect by default, if item is selected', () => {
    const onSelect = jest.fn();

    const driver = createDriver(createInputWithOptions({ options, onSelect }));
    driver.click();
    driver.optionAt(0).click();
    driver.click();
    driver.optionAt(0).click();

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('should trigger onSelect even if item is selected, if allowReselect is set', () => {
    const onSelect = jest.fn();

    const driver = createDriver(
      createInputWithOptions({ options, onSelect, allowReselect: true }),
    );
    driver.click();
    driver.optionAt(0).click();
    driver.click();
    driver.optionAt(0).click();

    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('should not show options element upon blur', async () => {
    const onSelect = jest.fn();
    const driver = createDriver(createInputWithOptions({ options, onSelect }));
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
    const wrapper = mount(createInputWithOptions({ options }));

    const driver = inputWithOptionsDriverFactory({
      element: wrapper
        .children()
        .at(0)
        .getDOMNode(),
      eventTrigger: Simulate,
    });

    expect(driver.isContentElementExists()).toBeFalsy();
    (wrapper.instance() as any).open();
    expect(driver.isContentElementExists()).toBeTruthy();
    (wrapper.instance() as any).close();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  describe('Filter', () => {
    const numericOptions = [
      OptionFactory.create({ id: 'a', value: 'a' }),
      OptionFactory.create({ id: 'b', value: 'b' }),
      OptionFactory.create({ id: 'c', value: 'c' }),
      OptionFactory.create({ id: 'd', value: 'd' }),
    ];

    const setup = props => {
      const wrapper = mount(createInputWithOptions(props));
      const driver = inputWithOptionsDriverFactory({
        element: wrapper
          .children()
          .at(0)
          .getDOMNode(),
        eventTrigger: Simulate,
      });
      return { wrapper, driver };
    };

    it('should filter by typed string by default', async () => {
      const props = { options: numericOptions, inputProps: { value: '' } };
      const { wrapper, driver } = setup(props);
      driver.click();
      expect(driver.getOptionsCount()).toBe(4);
      // Using keyDown in order to trigger isEditing mode
      driver.keyDown('a');
      wrapper.setProps({ inputProps: { value: 'a' } });
      expect(driver.getOptionsCount()).toBe(1);
    });

    describe('onContentMouseDown', () => {
      it('should be called when mouse down event occurs', () => {
        const onContentMouseDown = jest.fn();
        const props = {
          options: numericOptions,
          inputProps: { value: '' },
          onContentMouseDown,
        };
        const { driver } = setup(props);

        driver.click();
        driver.triggerMouseDownOnDropdownContent();
        expect(onContentMouseDown).toHaveBeenCalled();
      });
      it('should be called with event when mouse down event occurs', () => {
        const onContentMouseDown = jest.fn();
        const props = {
          options: numericOptions,
          inputProps: { value: '' },
          onContentMouseDown,
        };
        const { driver } = setup(props);
        driver.click();
        driver.triggerMouseDownOnDropdownContent();
        expect(onContentMouseDown.mock.calls[0].length).toBe(1);
      });
    });

    it('should support custom filtering', () => {
      const filterPredicate = (inputValue, optionValue) =>
        optionValue === 'b' || optionValue === 'c';
      const props = {
        options: numericOptions,
        inputProps: { value: '' },
        filterPredicate,
      };
      const { wrapper, driver } = setup(props);
      driver.click();
      expect(driver.getOptionsCount()).toBe(4);
      // Using keyDown in order to trigger isEditing mode
      driver.keyDown('a');
      wrapper.setProps({ inputProps: { value: 'a' } });
      expect(driver.getOptionsCount()).toBe(2);
      expect(driver.optionAt(0).getText()).toBe('b');
      expect(driver.optionAt(1).getText()).toBe('c');
    });

    it('should not display any option in case all options are filtered', async () => {
      const props = { options: numericOptions, inputProps: { value: '' } };
      const { wrapper, driver } = setup(props);
      driver.click();
      expect(driver.getOptionsCount()).toBe(4);
      // Using keyDown in order to trigger isEditing mode
      driver.keyDown('z');
      wrapper.setProps({ inputProps: { value: 'z' } });
      expect(driver.dropdownContentDisplayed()).toBe(false);
    });

    it('should display empty state message in case all options are filtered', () => {
      const emptyStateMessage = 'Empty state';
      const props = {
        options: numericOptions,
        inputProps: { value: '' },
        emptyStateMessage,
      };
      const { wrapper, driver } = setup(props);
      driver.click();
      // Using keyDown in order to trigger isEditing mode
      driver.keyDown('z');
      wrapper.setProps({ inputProps: { value: 'z' } });
      expect(driver.getOptionsCount()).toBe(1);
      expect(driver.optionAt(0).getText()).toBe(emptyStateMessage);
      expect(driver.optionAt(0).isDisabled()).toBeTruthy();
    });
  });

  describe('Focus and blur events', () => {
    it('Should call onFocus when input is focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(
        createInputWithOptions({ options }, { onFocus }),
      );
      driver.focus();

      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('Should call onBlur when input is blurred', () => {
      const onBlur = jest.fn();
      const driver = createDriver(
        createInputWithOptions({ options }, { onBlur }),
      );
      driver.blur();

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('onManualInput', () => {
    const onManualInput = jest.fn();
    const onSelect = jest.fn();

    const getDriver = (_options = options) => {
      return createDriver(
        createInputWithOptions({
          options: _options,
          onManualInput,
          onSelect,
          inputProps: { value: 'a' },
        }),
      );
    };

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

    it('should NOT trigger onManualInput when input is blurred given that the input value was NOT edited by the user', () => {
      const driver = getDriver();
      driver.click();
      driver.blur();
      expect(onManualInput).not.toHaveBeenCalled();
    });

    it('should trigger onManualInput when input is blurred, given that the user had edited the input', () => {
      const driver = getDriver();
      driver.keyDown('a');
      driver.blur();
      expect(onManualInput).toHaveBeenCalledWith('a');
      expect(onManualInput).toHaveBeenCalledTimes(1);
    });

    it('should trigger onManualInput with the actual value on Tab key', () => {
      const driver = getDriver();

      driver.click();
      driver.keyDown('Tab');
      driver.blur();
      expect(onManualInput).toHaveBeenCalledWith('a');
      expect(onManualInput).toHaveBeenCalledTimes(1);
    });
  });

  describe('`aria-` attributes of <input>', () => {
    const getDriver = (id = null, _options = options) => {
      return createDriver(
        createInputWithOptions({
          id,
          options: _options,
          inputProps: { value: 'a' },
        }),
      );
    };

    it('should have correct initial `aria-` attibutes', () => {
      const driver = getDriver();
      const input = driver.getInput();
      expect(input.getAttribute('aria-expanded')).toBe('false');
      expect(input.getAttribute('aria-autocomplete')).toBe('both');
      expect(input.getAttribute('aria-owns')).toBe(null);
    });

    it('should have correct `aria-owns` attibute if `id` was passed', async () => {
      const driver = getDriver('aa47d3f4');
      const input = driver.getInput();

      const owns: string | null = input.getAttribute('aria-owns');
      expect(owns).toBeTruthy();

      driver.click();
      await waitForCond(() => driver.isContentElementExists());

      expect(driver.getContentElement().querySelector('#' + owns)).toBeTruthy();
    });

    it('should have correct `aria-expanded` attibute', async () => {
      const driver = getDriver();
      const input = driver.getInput();
      expect(input.getAttribute('aria-expanded')).toBe('false');

      driver.click();
      await waitForCond(() => driver.isContentElementExists());
      expect(input.getAttribute('aria-expanded')).toBe('true');

      driver.keyDown('ArrowDown');
      expect(input.getAttribute('aria-expanded')).toBe('true');

      driver.keyDown('Escape');
      await waitForCond(() => !driver.isContentElementExists());
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have input with `aria-activedescendant` when option is hovered', async () => {
      const driver = getDriver('c95f4448');
      const input = driver.getInput();
      expect(input.getAttribute('aria-activedescendant')).toBeNull();

      driver.click();
      await waitForCond(() => driver.isContentElementExists());
      expect(input.getAttribute('aria-activedescendant')).toBeNull();

      driver.keyDown('ArrowDown');
      const activedescendant0: string | null = input.getAttribute(
        'aria-activedescendant',
      );
      expect(activedescendant0).toBeTruthy();
      const activeOption0 = driver
        .getContentElement()
        .querySelector('#' + activedescendant0);
      expect(activeOption0).toBeTruthy();
      expect(activeOption0.innerHTML).toBe(driver.optionAt(0).getText());

      driver.keyDown('ArrowDown');
      const activedescendant1: string | null = input.getAttribute(
        'aria-activedescendant',
      );
      expect(activedescendant1).toBeTruthy();
      expect(activedescendant1).not.toBe(activedescendant0);
      const activeOption1 = driver
        .getContentElement()
        .querySelector('#' + activedescendant1);
      expect(activeOption1).toBeTruthy();
      expect(activeOption1.innerHTML).toBe(driver.optionAt(1).getText());

      driver.keyDown('Escape');
      await waitForCond(() => !driver.isContentElementExists());
      expect(input.getAttribute('aria-activedescendant')).toBeNull();
    });
  });
});
