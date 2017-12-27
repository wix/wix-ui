import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {toggleSwitchTestkitFactory} from '../../testkit/protractor';

describe('ToggleSwitch', () => {
  const storyUrl = getStoryUrl('Components', 'ToggleSwitch');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display correct content', () => {
    const dataHook = 'story-toggle-switch';
    const driver = toggleSwitchTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find ToggleSwitch')
      .then(() => expect(driver.isDisabled()).toBe(false));
  });
});
