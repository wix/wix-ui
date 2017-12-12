import eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {inputTestkitFactory} from '../../testkit/protractor';

describe('Backoffice Button', () => {
  const storyUrl = getStoryUrl('Components', 'Input');

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should enter text to inpux', () => {
    const dataHook = 'story-button-enabled';
    const driver = inputTestkitFactory({dataHook});

    waitForVisibilityOf(driver.element(), 'Cannot find Input')
      .then(() => {
        const value = 'value';
        expect(driver.getText()).toBe('');
        driver.enterText(value);
        expect(driver.getText()).toBe(value);
      });
  });
});
