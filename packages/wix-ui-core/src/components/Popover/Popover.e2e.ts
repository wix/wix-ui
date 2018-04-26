import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {createStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {popoverTestkitFactory} from '../../testkit/protractor';

describe('Popover', () => {
  const storyUrl = createStoryUrl({kind: 'Components', story: 'Popover'});

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should exist', async () => {
    const dataHook = 'storybook-popover';
    const driver = popoverTestkitFactory({dataHook});

    await waitForVisibilityOf(driver.element(), 'Cannot find Popover');
    expect(await driver.element().isPresent()).toBe(true);
    expect(await driver.isContentElementExists()).toBe(false);
    await autoExampleDriver.setProps({shown: true});
    expect(await driver.isContentElementExists()).toBe(true);
  });
});
