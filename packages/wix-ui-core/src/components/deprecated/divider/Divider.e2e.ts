import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { dividerTestkitFactory } from '../../../testkit/protractor';
import { Category } from '../../../../stories/utils';

describe('Divider', () => {
  const storyUrl = createStoryUrl({
    kind: Category.COMPONENTS,
    story: 'Divider',
  });

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display correct content', () => {
    const dataHook = 'story-divider';
    const driver = dividerTestkitFactory({ dataHook });

    return waitForVisibilityOf(driver.element(), 'Cannot find Divider').then(
      () => {
        expect(driver.exists()).toBe(true);
      },
    );
  });
});
