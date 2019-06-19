import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  getStoryUrl,
  waitForVisibilityOf,
  getElementByDataHook,
} from 'wix-ui-test-utils/protractor';
import { inputWithOptionsTestkitFactory } from '../../testkit/protractor';
import { DataHook } from './InputWithOptionsTestFixture';

describe('InputWithOptions', () => {
  const storyUrl = getStoryUrl('Tests', 'InputWithOptions');

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should enter text to inputWithOptions', async () => {
    const driver = inputWithOptionsTestkitFactory({
      dataHook: DataHook.inputWithOptions,
    });

    await waitForVisibilityOf(driver.element(), 'Cannot find InputWithOptions');
    await driver.enterText('value');

    await driver
      .dropdownContent()
      .optionAt(0)
      .click();

    const onSelectCount = await getElementByDataHook(
      DataHook.onSelectCount,
    ).getText();

    const onManualInputCount = await getElementByDataHook(
      DataHook.onManualInputCount,
    ).getText();

    expect(onSelectCount).toEqual(0);
    expect(onManualInputCount).toEqual(0);
  });
});
