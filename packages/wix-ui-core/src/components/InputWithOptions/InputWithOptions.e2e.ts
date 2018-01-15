import * as eyes from 'eyes.it';
import {browser, protractor} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {inputWithOptionsTestkitFactory} from '../../testkit/protractor';

describe('InputWithOptions', () => {
  describe('Single Select', () => {
    const storyUrl = getStoryUrl('Components', 'InputWithOptions Single select');

    beforeEach(() => {
      browser.get(storyUrl);
    });

    eyes.it('should select item in single select with mouse', () => {
      const dataHook = 'story-input-with-options-single';
      const driver = inputWithOptionsTestkitFactory({dataHook});

      return waitForVisibilityOf(driver.element(), 'Cannot find InputWithOptions')
        .then(async () => {

          await expect(driver.getText()).toBe('');
          await driver.focusInput();
          await driver.selectOption(1);
          await expect(driver.getText()).toBe('value1');
        });
    });
  });

  describe('Multi Select', () => {
    const storyUrl = getStoryUrl('Components', 'InputWithOptions Multi select');

    beforeEach(() => {
      browser.get(storyUrl);
    });

    eyes.it('should select items in multi select including items unseen with keyboard arrow down', () => {
      const dataHook = 'story-input-with-options-multi';
      const driver = inputWithOptionsTestkitFactory({dataHook});

      return waitForVisibilityOf(driver.element(), 'Cannot find InputWithOptions')
        .then(async () => {

          await expect(driver.getText()).toBe('');
          await driver.focusInput();
          for (let i = 0; i < 3; ++i) {
            await driver.enterText(protractor.Key.ARROW_DOWN);
            await driver.enterText(protractor.Key.ENTER);
          }

          await expect(driver.getText()).toBe('value0 value1 value4');

          for (let i = 0; i < 15; ++i) {
            await driver.enterText(protractor.Key.ARROW_DOWN);
          }

          await driver.enterText(protractor.Key.ENTER);
          await expect(driver.getText()).toBe('value0 value1 value4 value19');

          await driver.enterText(protractor.Key.ARROW_DOWN);
          await driver.enterText(protractor.Key.ENTER);
          await expect(driver.getText()).toBe('value1 value4 value19');
        });
    });

    eyes.it('should select items in multi select including items unseen with keyboard arrow up', () => {
      const dataHook = 'story-input-with-options-multi';
      const driver = inputWithOptionsTestkitFactory({dataHook});

      return waitForVisibilityOf(driver.element(), 'Cannot find InputWithOptions')
        .then(async () => {

          await expect(driver.getText()).toBe('');
          await driver.focusInput();
          for (let i = 0; i < 3; ++i) {
            await driver.enterText(protractor.Key.ARROW_UP);
            await driver.enterText(protractor.Key.ENTER);
          }

          await expect(driver.getText()).toBe('value19 value18 value17');

          for (let i = 0; i < 15; ++i) {
            await driver.enterText(protractor.Key.ARROW_UP);
          }

          await driver.enterText(protractor.Key.ENTER);
          await expect(driver.getText()).toBe('value19 value18 value17 value0');

          await driver.enterText(protractor.Key.ARROW_UP);
          await driver.enterText(protractor.Key.ENTER);
          await expect(driver.getText()).toBe('value18 value17 value0');
        });
    });
  });
});
