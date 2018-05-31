import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {inputTestkitFactory} from '../../testkit/protractor';

describe('Input', () => {
  const storyUrl = getStoryUrl('Components', 'Input');

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should enter text to input', async () => {
    const dataHook = 'storybook-input';
    const driver = inputTestkitFactory({dataHook});

    await waitForVisibilityOf(driver.element(), 'Cannot find Input');
    expect(await driver.getText()).toBe('');
    await driver.enterText('foobar');
    expect(await driver.getText()).toBe('foobar');
  });
});
