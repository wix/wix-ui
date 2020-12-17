import * as React from 'react';
import { radioButtonDriverFactory } from './RadioButton.driver';
import { radioButtonUniDriverFactory } from './RadioButton.uni.driver';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { RadioButton, RadioButtonProps } from './RadioButton';

function createRadio(props: RadioButtonProps = {}) {
  return (
    <RadioButton
      label={<span>Horsie</span>}
      checkedIcon={<span>🦄</span>}
      uncheckedIcon={<span>🦄</span>}
      value="horsie"
      {...props}
    />
  );
}

describe('RadioButton', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  describe('[sync]', () => {
    runTests(testContainer.createLegacyRenderer(radioButtonDriverFactory));
    runSyncTests(testContainer.createLegacyRenderer(radioButtonDriverFactory));
  });

  describe('[async]', () => {
    runTests(testContainer.createUniRendererAsync(radioButtonUniDriverFactory));
  });

  function runTests(createDriver) {
    it('renders to the screen', async () => {
      const radio = await createDriver(createRadio());

      expect(await radio.exists()).toBeTruthy();
    });

    it('invokes callback for onKeyDown with the correct value', async () => {
      const onKeyDown = jest.fn();
      const radio = await createDriver(createRadio({ onKeyDown }));

      await radio.keyDown('Enter');
      expect(onKeyDown.mock.calls.length).toEqual(1);
      expect(onKeyDown.mock.calls[0][0].value).toEqual('horsie');
    });

    it('is checked correctly', async () => {
      const radio = await createDriver(createRadio({ checked: true }));

      expect(await radio.isChecked()).toBeTruthy();
    });

    it('is disabled correctly', async () => {
      const radio = await createDriver(createRadio({ disabled: true }));

      expect(await radio.isDisabled()).toBeTruthy();
    });

    it('does not invoke callback function when disabled and keydown happens', async () => {
      const onKeyDown = jest.fn();
      const radio = await createDriver(
        createRadio({ onKeyDown, disabled: true })
      );

      await radio.keyDown('Enter');
      expect(onKeyDown).not.toHaveBeenCalled();
    });

    it('is required correctly', async () => {
      const radio = await createDriver(createRadio({ required: true }));

      expect(await radio.isRequired()).toBeTruthy();
    });

    it('accepts correct value', async () => {
      const radio = await createDriver(createRadio({ value: 'unicorn' }));

      expect(await radio.value()).toEqual('unicorn');
    });

    it('accepts correct name', async () => {
      const radio = await createDriver(createRadio({ name: 'unicorns' }));

      expect(await radio.name()).toEqual('unicorns');
    });

    it('renders label correctly', async () => {
      const radio = await createDriver(createRadio());

      expect(await radio.labelExists()).toBeTruthy();
    });

    it('renders icon correctly', async () => {
      const radio = await createDriver(createRadio());

      expect(await radio.iconExists()).toBeTruthy();
    });

    it('gets NON VISIBLE focus if clicked', async () => {
      const radio = await createDriver(createRadio());
      await radio.click();

      expect(await radio.isFocused()).toBeTruthy();
      expect(await radio.isFocusVisible()).toBeFalsy();
    });

    it('focuses on click', async () => {
      const radio = await createDriver(createRadio());
      expect(await radio.isInputFocused()).toBeFalsy();
      await radio.click();

      expect(await radio.isInputFocused()).toBeTruthy();
    })
  }

  function runSyncTests(createDriver) {
    it('invokes callback for onChange with the correct value', async () => {
      const onChange = jest.fn();
      const radio = await createDriver(createRadio({ onChange }));
      expect(await radio.isInputFocused()).toBeFalsy();

      await radio.select();
      expect(onChange.mock.calls.length).toEqual(1);
      expect(onChange.mock.calls[0][0].value).toEqual('horsie');
      expect(await radio.isInputFocused()).toBeTruthy();
    });

    it('does not invoke callback function when disabled and clicked', async () => {
      const onChange = jest.fn();
      const radio = await createDriver(
        createRadio({ onChange, disabled: true })
      );

      radio.select();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('gets VISIBLE focus if changed without clicking', async () => {
      const radio = await createDriver(createRadio());
      radio.select();

      expect(await radio.isFocused()).toBeTruthy();
      expect(await radio.isFocusVisible()).toBeTruthy();
    });
  }
});
