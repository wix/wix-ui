import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { labelTestkitFactory } from '../../../testkit/protractor';

describe('Label', () => {
  const storyUrl = createStoryUrl({ kind: 'Components', story: 'Label' });

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-label';
    const driver = labelTestkitFactory({ dataHook });

    return waitForVisibilityOf(driver.element(), 'Cannot find Label').then(() =>
      expect(driver.getLabelText()).toBe('hello'),
    );
  });
});
