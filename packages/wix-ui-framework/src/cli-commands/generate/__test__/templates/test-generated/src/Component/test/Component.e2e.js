import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../../test/utils/eyes-it';
import { createTestStoryUrl } from '../../../test/utils/storybook-helpers';
import { {%componentName%}TestkitFactory } from '../../../testkit/protractor';
import { storySettings } from './storySettings';

const eyes = eyesItInstance();

describe('{%ComponentName%}', () => {
  const createStoryUrl = testName =>
    createTestStoryUrl({ ...storySettings, testName });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = {%componentName%}TestkitFactory({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <{%ComponentName%}/> component with dataHook of ${dataHook}`,
    );

    await scrollToElement(await driver.element());

    return driver;
  };

  const testStoryNames = storySettings.testStoryNames;

  eyes.it('should increase count when button clicked', async () => {
    await browser.get(createStoryUrl(testStoryNames.DEFAULT));
    const driver = await createDriver();
    await driver.clickButton();
    expect(await driver.getCountText()).toBe('You clicked this button odd number (1) of times');
  });
});
