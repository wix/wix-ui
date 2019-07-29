import * as React from 'react';
import { ReactDOMTestContainer } from '../../../../test/dom-test-container';
import { signaturePadUniDriverFactory } from '../SignatureInput.uni.driver';
import {
  SignatureInputTestFixture,
  TEST_IDS,
} from './SignatureInputTestFixture';

const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

const createDriver = ({ onClear }: { onClear?(): void } = {}) =>
  testContainer.createUniRenderer(signaturePadUniDriverFactory)(
    <SignatureInputTestFixture onClear={onClear} />,
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
});
