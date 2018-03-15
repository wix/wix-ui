import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {hboxTestkitFactory} from '../../testkit/protractor';

describe('HBox', () => {
  const storyUrl = getStoryUrl('Components', 'StylableHBox');

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-text';
    const driver = hboxTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find HBox')
      .then(() => expect(driver.getChildren()[1].html()).toBe('<div>hello</div>'));
  });
});
