import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {hBoxTestkitFactory} from '../../testkit/protractor';

describe('HBox', () => {
  const storyUrl = getStoryUrl('Components', 'HBox');

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-hbox';
    const driver = hBoxTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find HBox');
  });
});
