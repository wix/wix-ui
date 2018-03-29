import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {textTestkitFactory} from '../../testkit/protractor';

describe('Text', () => {
  const storyUrl = getStoryUrl('Components', 'StylableText');

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-text';
    const driver = textTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Text')
      .then(() => expect(driver.getText()).toBe('hello'));
  });
});
