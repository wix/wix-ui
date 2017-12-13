import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {inputTestkitFactory} from '../../testkit/protractor';

describe('Input', () => {
  const storyUrl = getStoryUrl('Components', 'Input');

  beforeEach(() => {
    browser.get(storyUrl);
  });

  it('should enter text to input', () => {
    const dataHook = 'story-input';
    const driver = inputTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Input')
      .then(async () => {
        const value = 'value';
        await expect(driver.getText()).toBe('');
        await driver.enterText(value);
        await expect(driver.getText()).toBe(value);
      });
  });
});
