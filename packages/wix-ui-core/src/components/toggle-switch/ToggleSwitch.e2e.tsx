import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { toggleSwitchTestkitFactory } from '../../testkit/protractor';
import { Key } from 'selenium-webdriver';
import { Category } from '../../../stories/utils';

describe('ToggleSwitch', () => {
  const storyUrl = createStoryUrl({
    kind: Category.COMPONENTS,
    story: 'ToggleSwitch',
  });
  const dataHook = 'story-toggleswitch';

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should toggle', () => {
    const driver = toggleSwitchTestkitFactory({ dataHook });

    return waitForVisibilityOf(
      driver.element(),
      'Cannot find ToggleSwitch',
    ).then(() => {
      expect(driver.checked()).toBeFalsy();

      driver.click();
      expect(driver.checked()).toBeTruthy();

      driver.click();
      expect(driver.checked()).toBeFalsy();
    });
  });

  eyes.it('should support accessiblility features', () => {
    const driver = toggleSwitchTestkitFactory({ dataHook });

    return waitForVisibilityOf(
      driver.element(),
      'Cannot find ToggleSwitch',
    ).then(() => {
      expect(driver.checked()).toBe(false);

      browser.actions().sendKeys(Key.TAB, Key.SPACE).perform();
      expect(driver.checked()).toBe(true);

      browser.actions().sendKeys(Key.SPACE).perform();
      expect(driver.checked()).toBe(false);

      browser.actions().sendKeys(Key.CONTROL).perform();
      expect(driver.checked()).toBe(false);
    });
  });
});
