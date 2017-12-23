import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {badgeTestkitFactory} from '../../testkit/protractor';

describe('Badge', () => {
  const storyUrl = getStoryUrl('Components', 'Badge');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display correct content', () => {
    const dataHook = 'story-badge';
    const driver = badgeTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Badge')
      .then(() => expect(driver.getTextContent()).toBe('Hello'));
  });
});
