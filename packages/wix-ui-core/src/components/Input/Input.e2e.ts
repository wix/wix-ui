import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {inputTestkitFactory} from '../../testkit/protractor';

describe('Input', () => {
  const storyUrl = getStoryUrl('Components', 'Input');

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should enter text to input', () => {
    const dataHook = 'storybook-input';
    const driver = inputTestkitFactory({dataHook});

    waitForVisibilityOf(driver.element(), 'Cannot find Input');
    expect(driver.getText()).toBe('');
    driver.enterText('foobar');
    expect(driver.getText()).toBe('foobar');
  });
});
