import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {checkboxTestkitFactory} from '../../testkit/protractor';
import {Key} from 'selenium-webdriver';

describe('Checkbox', () => {
  const storyUrl = getStoryUrl('Components', 'Checkbox');
  const dataHook = 'storybook-checkbox';

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display correct content', () => {
    const driver = checkboxTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Checkbox');
  });

  eyes.it('should toggle', () => {
    const driver = checkboxTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Checkbox')
    .then(() => {
      expect(driver.checked()).toBeFalsy();

      driver.click();
      expect(driver.checked()).toBeTruthy();

      driver.click();
      expect(driver.checked()).toBeFalsy();
    });
  });

  eyes.it('should support accessiblility features', () => {
    const driver = checkboxTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Checkbox')
    .then(() => {
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
