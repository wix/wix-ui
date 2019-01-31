import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { thumbnailTestkitFactory } from '../../testkit/protractor';

describe('Thumbnail', () => {
  const storyUrl = createStoryUrl({ kind: 'Components', story: 'Thumbnail' });

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should exist', () => {
    const dataHook = 'storybook-thumbnail';
    const driver = thumbnailTestkitFactory({ dataHook });

    return waitForVisibilityOf(driver.element(), 'Cannot find Thumbnail').then(
      () => expect(driver.element().isPresent()).toBe(true),
    );
  });
});
