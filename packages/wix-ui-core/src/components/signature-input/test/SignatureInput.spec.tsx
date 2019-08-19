import * as React from 'react';
import { ReactDOMTestContainer } from '../../../../test/dom-test-container';
import { signatureInputUniDriverFactory } from '../SignatureInput.uni.driver';
import {
  SignatureInputTestFixture,
  TEST_IDS,
  SignatureInputTestFixtureProps,
} from './SignatureInputTestFixture';

const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

const createDriver = (props: SignatureInputTestFixtureProps = {}) =>
  testContainer.createUniRenderer(signatureInputUniDriverFactory)(
    <SignatureInputTestFixture {...props} />,
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

  it('should invoke onClear callback', async () => {
    const onClearSpy = jest.fn();
    const driver = createDriver({ onClear: onClearSpy });
    const clearButton = await driver.getChildDriverByHook(
      TEST_IDS.CLEAR_BUTTON,
    );
    await clearButton.click();
    expect(onClearSpy).toHaveBeenCalled();
  });

  it('should invoke onInit callback', async () => {
    const onInitSpy = jest.fn();
    createDriver({ onInit: onInitSpy });

    expect(onInitSpy).toHaveBeenCalled();
    const [padApi] = onInitSpy.mock.calls[0];

    expect(padApi).toHaveProperty('clear');
    expect(padApi).toHaveProperty('toDataURL');
  });

  it('should invoke canvasRef callback', async () => {
    const canvasRefSpy = jest.fn();
    createDriver({ canvasRef: canvasRefSpy });

    expect(canvasRefSpy).toHaveBeenCalled();

    const [canvasEl] = canvasRefSpy.mock.calls[0];
    expect(canvasEl.tagName).toBe('CANVAS');
  });
});
