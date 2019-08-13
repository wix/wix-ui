import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  waitForVisibilityOf,
  getElementByDataHook,
  createStoryUrl,
} from 'wix-ui-test-utils/protractor';
import { inputWithOptionsTestkitFactory } from '../../testkit/protractor';
import { DataHook } from './InputWithOptionsTestFixture';
import { Category } from '../../../stories/utils';

describe('InputWithOptions', () => {
  const storyUrl = createStoryUrl({
    kind: Category.TESTS,
    story: 'InputWithOptions',
  });

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

    expect(onSelectCount).toEqual('1');
    expect(onManualInputCount).toEqual('0');
  });

  eyes.it('Should allow styling empty state', async () => {
    const driver = inputWithOptionsTestkitFactory({
      dataHook: DataHook.inputWithOptions,
    });
    await waitForVisibilityOf(driver.element(), 'Cannot find InputWithOptions');
    await driver.enterText('kjhasmasdl');
    const emptyStateText = await driver
      .dropdownContent()
      .optionAt(0)
      .getText();
    expect(emptyStateText).toEqual('No results');
  });
});
