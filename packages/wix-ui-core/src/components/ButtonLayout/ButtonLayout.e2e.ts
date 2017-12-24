import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {buttonLayoutTestkitFactory} from '../../testkit/protractor';

describe('ButtonLayout', () => {
  const storyUrl = getStoryUrl('Components', 'ButtonLayout');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display correct content', () => {
    const dataHook = 'story-button-layout';
    const driver = buttonLayoutTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find ButtonLayout')
      .then(async () => {
        await expect(driver.getTextContent()).toBe('Hello');
      });
  });
});
