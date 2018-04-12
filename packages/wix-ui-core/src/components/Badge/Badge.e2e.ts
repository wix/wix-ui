import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {badgeTestkitFactory} from '../../testkit/protractor';

// Badge component is to be removed and no longer has automated story,
// thus this test fails.
// StylableBadge should become Badge
xdescribe('Badge', () => {
  const storyUrl = getStoryUrl('Components', 'Badge');

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-badge';
    const driver = badgeTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Badge')
      .then(() => expect(driver.getTextContent()).toBe('I\'m a Badge!'));
  });
});
