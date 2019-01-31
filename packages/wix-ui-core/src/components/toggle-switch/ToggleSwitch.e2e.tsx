import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { toggleSwitchTestkitFactory } from '../../testkit/protractor';
import { Key } from 'selenium-webdriver';

describe('ToggleSwitch', () => {
  const storyUrl = createStoryUrl({
    kind: 'Components',
    story: 'ToggleSwitch',
  });
  const dataHook = 'story-toggleswitch';

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should toggle', async () => {
    const driver = toggleSwitchTestkitFactory({ dataHook });

    await waitForVisibilityOf(driver.element(), 'Cannot find ToggleSwitch');

    expect(await driver.checked()).toBeFalsy();

    await driver.click();
    expect(await driver.checked()).toBeTruthy();

    await driver.click();
    expect(await driver.checked()).toBeFalsy();
  });

  eyes.it('should support accessiblility features', async () => {
    const driver = toggleSwitchTestkitFactory({ dataHook });

    await waitForVisibilityOf(driver.element(), 'Cannot find ToggleSwitch');

    expect(await driver.checked()).toBe(false);

    await browser
      .actions()
      .sendKeys(Key.TAB, Key.SPACE)
      .perform();
    expect(await driver.checked()).toBe(true);

    await browser
      .actions()
      .sendKeys(Key.SPACE)
      .perform();
    expect(await driver.checked()).toBe(false);

    await browser
      .actions()
      .sendKeys(Key.CONTROL)
      .perform();
    expect(await driver.checked()).toBe(false);
  });
});
