import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {buttonTestkitFactory} from '../../testkit/protractor';

describe('Button', () => {
  const storyUrl = getStoryUrl('Components', 'Button');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-button';
    const driver = buttonTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Button')
      .then(async () => {
        await expect(driver.getTextContent()).toBe('I\'m a Button!');
      });
  });
});
