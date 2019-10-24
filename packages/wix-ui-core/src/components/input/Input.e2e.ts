import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { inputTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('Input', () => {
  const storyUrl = createStoryUrl({
    kind: Category.COMPONENTS,
    story: 'Input',
  });

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should enter text to input', async () => {
    const dataHook = 'storybook-input';
    const driver = inputTestkitFactory({ dataHook });

    await waitForVisibilityOf(driver.element(), 'Cannot find Input');
    expect(await driver.getText()).toBe('');
    await driver.enterText('foobar');
    expect(await driver.getText()).toBe('foobar');
  });
});
