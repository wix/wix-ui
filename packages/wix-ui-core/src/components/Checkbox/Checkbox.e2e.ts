import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {checkboxTestkitFactory} from '../../testkit/protractor';

describe('Checkbox', () => {
  const storyUrl = getStoryUrl('Components', 'Checkbox');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-checkbox';
    const driver = checkboxTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Checkbox');
  });
});
