import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { checkboxTestkitFactory } from '../../testkit/protractor';
import { Key } from 'selenium-webdriver';
import { Category } from '../../../stories/utils';

describe('Checkbox', () => {
  const storyUrl = createStoryUrl({
    kind: Category.COMPONENTS,
    story: 'Checkbox',
  });
  const dataHook = 'storybook-checkbox';

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display correct content', () => {
    const driver = checkboxTestkitFactory({ dataHook });

    return waitForVisibilityOf(driver.element(), 'Cannot find Checkbox');
  });

  eyes.it('should toggle', async () => {
    const driver = checkboxTestkitFactory({ dataHook });

    await waitForVisibilityOf(driver.element(), 'Cannot find Checkbox');
    expect(driver.isChecked()).toBe(false);

    driver.click();
    expect(driver.isChecked()).toBe(true);

    driver.click();
    expect(driver.isChecked()).toBe(false);
  });

  it('should support accessiblility features', async () => {
    const driver = checkboxTestkitFactory({ dataHook });

    await waitForVisibilityOf(driver.element(), 'Cannot find Checkbox');
    expect(driver.isChecked()).toBe(false);

    browser
      .actions()
      .sendKeys(Key.TAB, Key.SPACE)
      .perform();
    expect(driver.isChecked()).toBe(true);

    browser
      .actions()
      .sendKeys(Key.SPACE)
      .perform();
    expect(driver.isChecked()).toBe(false);

    browser
      .actions()
      .sendKeys(Key.ENTER)
      .perform();
    expect(driver.isChecked()).toBe(false);
  });
});
