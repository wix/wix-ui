import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {vBoxTestkitFactory} from '../../testkit/protractor';

describe('VBox', () => {
  const storyUrl = getStoryUrl('Components', 'VBox');

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-vbox';
    const driver = vBoxTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find VBox');
  });
});
