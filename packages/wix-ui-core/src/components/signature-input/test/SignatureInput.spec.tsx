import * as React from 'react';
import { ReactDOMTestContainer } from '../../../../test/dom-test-container';
import { signatureInputUniDriverFactory } from '../SignatureInput.uni.driver';
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
  testContainer.createUniRenderer(signatureInputUniDriverFactory)(
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
    const title = await driver.getChildDriverByHook(TEST_IDS.TITLE);
    expect(await title.exists()).toBe(true);
  });

  it('should pass props to clear button component', async () => {
    const driver = createDriver();
    const label = await driver.getChildDriverByHook(TEST_IDS.CLEAR_BUTTON);
    expect(await label.exists()).toBe(true);
  });

  describe('callbacks', () => {
    it('should invoke onClear callback', async () => {
      const onClearSpy = jest.fn();
      const driver = createDriver({ onClear: onClearSpy });
      const clearButton = await driver.getChildDriverByHook(
        TEST_IDS.CLEAR_BUTTON,
      );
      await clearButton.click();
      expect(onClearSpy).toHaveBeenCalled();
    });

    it.skip('should invoke onInit callback', async () => {
      const onInitSpy = jest.fn();
      createDriver({ onInit: onInitSpy });

      expect(onInitSpy).toHaveBeenCalled();
      const [padApi] = onInitSpy.mock.calls[0];

      expect(padApi).toHaveProperty('clear');
      expect(padApi).toHaveProperty('toDataURL');
      expect(padApi).toHaveProperty('onDraw');
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
      const padDriver = await driver.getChildDriverByHook(TEST_IDS.PAD);

      await padDriver.click();

      expect(canvasOnClickSpy).toHaveBeenCalled();
    });

    it('should not invoke pad onClick', async () => {
      const canvasOnClickSpy = jest.fn();
      const driver = createDriver({
        onClick: canvasOnClickSpy,
        disabled: true,
      });
      const padDriver = await driver.getChildDriverByHook(TEST_IDS.PAD);

      await padDriver.click();

      expect(canvasOnClickSpy).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should set aria-disabled for canvas tag', async () => {
      const driver = createDriver({ disabled: true });
      const padDriver = await driver.getChildDriverByHook(TEST_IDS.PAD);
      const hasAriaDisabled = await padDriver.attr('aria-disabled');
      expect(hasAriaDisabled).toBe('true');
    });

    it('should set aria-required', async () => {
      const driver = createDriver({ required: true });
      const padDriver = await driver.getChildDriverByHook(TEST_IDS.PAD);
      const hasAriaRequired = await padDriver.attr('aria-required');
      expect(hasAriaRequired).toBe('true');
    });

    it('should set aria-labelledby to title id', async () => {
      const driver = createDriver();
      const padDriver = await driver.getChildDriverByHook(TEST_IDS.PAD);
      const titleDriver = await driver.getChildDriverByHook(TEST_IDS.TITLE);

      const padAriaLabelledBy = await padDriver.attr('aria-labelledby');
      const titleId = await titleDriver.attr('id');

      expect(padAriaLabelledBy).toBe(titleId);
    });

    it('should not set aria-labelledby when title is not rendered', async () => {
      const driver = createDriver({ titleText: '' });
      const padDriver = await driver.getChildDriverByHook(TEST_IDS.PAD);

      const padAriaLabelledBy = await padDriver.attr('aria-labelledby');

      expect(padAriaLabelledBy).toBe(null);
    });
  });
});
