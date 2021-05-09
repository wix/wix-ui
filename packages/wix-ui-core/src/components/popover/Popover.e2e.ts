import * as eventually from 'wix-eventually';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { popoverTestkitFactory } from '../../testkit/protractor';
import { browser, by, element, Key } from 'protractor';
import { Category } from '../../../stories/utils';

describe('Popover', () => {
  const storyUrl = createStoryUrl({
    kind: Category.TESTS,
    story: 'Popover - A11Y',
  });
  const popoverDataHook = 'storybook-popover-a11y';

  beforeEach(() => browser.get(storyUrl));

  it('should call onTabOut when tabbing out of the popover', async () => {
    const driver = popoverTestkitFactory({ dataHook: popoverDataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Popover');

    await eventually(async () => {
      expect(await driver.isContentElementExists()).toBe(true);
    });

    await element(by.buttonText('Focus Input')).click();

    expect(await element(by.id('blurred-hook')).isDisplayed()).toBe(false);

    const nestedInputElement = element(by.css('[role="dialog"] input'));

    nestedInputElement.sendKeys(Key.TAB);

    await eventually(async () => {
      expect(await element(by.id('blurred-hook')).isDisplayed()).toBe(true);
    });
  });

  it('should call onEscPress when popover is focused and esc is pressed', async () => {
    const driver = popoverTestkitFactory({ dataHook: popoverDataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Popover');

    await eventually(async () => {
      expect(await driver.isContentElementExists()).toBe(true);
    });

    await element(by.buttonText('Focus Popover')).click();

    expect(await element(by.id('escape-hook')).isDisplayed()).toBe(false);

    const popoverContentElement = element(by.css('[role="dialog"]'));

    popoverContentElement.sendKeys(Key.ESCAPE);

    expect(await element(by.id('escape-hook')).isDisplayed()).toBe(true);
  });

  it('should call onEscPress when input in popover is focused and esc is pressed', async () => {
    const driver = popoverTestkitFactory({ dataHook: popoverDataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Popover');

    await eventually(async () => {
      expect(await driver.isContentElementExists()).toBe(true);
    });

    await element(by.buttonText('Focus Input')).click();

    expect(await element(by.id('escape-hook')).isDisplayed()).toBe(false);

    const popoverContentElement = element(by.css('[role="dialog"]'));

    popoverContentElement.sendKeys(Key.ESCAPE);

    expect(await element(by.id('escape-hook')).isDisplayed()).toBe(true);
  });
});
