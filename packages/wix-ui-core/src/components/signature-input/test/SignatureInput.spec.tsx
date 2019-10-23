import * as React from 'react';
import { ReactDOMTestContainer } from '../../../../test/dom-test-container';
import { signatureInputPrivateUniDriverFactory } from './SignatureInput.private.uni.driver';
import {
  SignatureInputTestFixture,
  TEST_IDS,
  SignatureInputTestFixtureProps,
} from './SignatureInputTestFixture';

const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

const createDriver = ({
  titleText = 'Enter your signature here:',
  ...rest
}: SignatureInputTestFixtureProps = {}) =>
  testContainer.createUniRenderer(signatureInputPrivateUniDriverFactory)(
    <SignatureInputTestFixture titleText={titleText} {...rest} />,
  );

describe('SigningPad', () => {
  it('should exist', async () => {
    const driver = createDriver();
    const doesExist = await driver.exists();
    expect(doesExist).toBe(true);
  });

  it('should pass props to title component', async () => {
    const driver = createDriver();
    const title = driver.getChildDriverByHook(TEST_IDS.TITLE);
    expect(await title.exists()).toBe(true);
  });

  it('should pass props to clear button component', async () => {
    const driver = createDriver();
    const label = driver.getChildDriverByHook(TEST_IDS.CLEAR_BUTTON);
    expect(await label.exists()).toBe(true);
  });

  describe('callbacks', () => {
    it('should invoke onClear callback', async () => {
      const onClearSpy = jest.fn();
      const driver = createDriver({ onClear: onClearSpy });
      const clearButton = driver.getChildDriverByHook(TEST_IDS.CLEAR_BUTTON);
      await clearButton.click();
      expect(onClearSpy).toHaveBeenCalled();
    });

    it('should invoke onInit callback', async () => {
      const onInitSpy = jest.fn();
      createDriver({ onInit: onInitSpy });

      expect(onInitSpy).toHaveBeenCalled();
      const [padApi] = onInitSpy.mock.calls[0];

      expect(padApi).toHaveProperty('focus');
      expect(padApi).toHaveProperty('blur');
      expect(padApi).toHaveProperty('clear');
      expect(padApi).toHaveProperty('toDataURL');
      expect(padApi).toHaveProperty('isEmpty');
    });

    it('should invoke canvasRef callback', async () => {
      const canvasRefSpy = jest.fn();
      createDriver({ canvasRef: canvasRefSpy });

      expect(canvasRefSpy).toHaveBeenCalled();

      const [canvasEl] = canvasRefSpy.mock.calls[0];
      expect(canvasEl.tagName).toBe('CANVAS');
    });

    it('should invoke pad onClick', async () => {
      const canvasOnClickSpy = jest.fn();
      const driver = createDriver({ onClick: canvasOnClickSpy });
      const padDriver = driver.getChildDriverByHook(TEST_IDS.PAD);

      await padDriver.click();

      expect(canvasOnClickSpy).toHaveBeenCalled();
    });

    it('should not invoke disabled pad onClick', async () => {
      const canvasOnClickSpy = jest.fn();
      const driver = createDriver({
        onClick: canvasOnClickSpy,
        disabled: true,
      });
      const padDriver = driver.getChildDriverByHook(TEST_IDS.PAD);

      await padDriver.click();

      expect(canvasOnClickSpy).not.toHaveBeenCalled();
    });

    it('should invoke onFocus', async () => {
      const inputOnFocusSpy = jest.fn();
      const driver = createDriver({
        onFocus: inputOnFocusSpy,
      });

      await driver.focusA11yInput();

      expect(inputOnFocusSpy).toHaveBeenCalled();
    });

    it('should invoke onBlur', async () => {
      const inputOnBlurSpy = jest.fn();
      const driver = createDriver({
        onBlur: inputOnBlurSpy,
      });

      await driver.focusA11yInput();
      await driver.blurA11yInput();

      expect(inputOnBlurSpy).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should set disabled for a11y input', async () => {
      const driver = createDriver({ disabled: true });
      const hasDisabled = await driver.getA11yInput().attr('disabled');
      expect(hasDisabled).not.toBe(null);
    });

    it('should set required for a11y input', async () => {
      const driver = createDriver({ required: true });
      const hasRequired = await driver.getA11yInput().attr('required');
      expect(hasRequired).not.toBe(null);
    });

    it('should set a11y input aria-labelledby to title id', async () => {
      const driver = createDriver();
      const titleDriver = driver.getChildDriverByHook(TEST_IDS.TITLE);

      const a11yInputAriaLabelledBy = await driver
        .getA11yInput()
        .attr('aria-labelledby');
      const titleId = await titleDriver.attr('id');

      expect(a11yInputAriaLabelledBy).toBe(titleId);
    });

    it('should not set a11y input aria-labelledby when title is not rendered', async () => {
      const driver = createDriver({ titleText: '' });

      const a11yInputAriaLabelledBy = await driver
        .getA11yInput()
        .attr('aria-labelledby');

      expect(a11yInputAriaLabelledBy).toBe(null);
    });

    it('should set clear button aria-controls to a11y input id', async () => {
      const driver = createDriver();
      const clearButtonDriver = driver.getChildDriverByHook(
        TEST_IDS.CLEAR_BUTTON,
      );

      const a11yInputId = await driver.getA11yInput().attr('id');
      const clearButtonAriaControls = await clearButtonDriver.attr(
        'aria-controls',
      );

      expect(a11yInputId).toBe(clearButtonAriaControls);
    });

    it('should clear a11y input when clear button is clicked', async () => {
      const driver = createDriver();
      const clearButtonDriver = driver.getChildDriverByHook(
        TEST_IDS.CLEAR_BUTTON,
      );
      const a11yInputDriver = driver.getA11yInput();

      await a11yInputDriver.enterValue('a value');

      expect(await a11yInputDriver.attr('value')).not.toBe('');
      await clearButtonDriver.click();
      expect(await a11yInputDriver.attr('value')).toBe('');
    });
  });
});
