import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {vboxTestkitFactory} from '../../testkit/protractor';

describe('VBox', () => {
  const storyUrl = getStoryUrl('Components', 'StylableVBox');

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-vbox';
    const driver = vboxTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find VBox')
      .then(() => expect(driver.getChildren()[1].html()).toBe('<div>hello</div>'));
  });
});
