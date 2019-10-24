import { $, browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
  isFocused,
} from 'wix-ui-test-utils/protractor';
import { buttonNextTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('FocusableHOC', () => {
  const testsStoryUrl = createStoryUrl({
    kind: Category.TESTS,
    story: 'FocusableHOC',
  });

  beforeEach(() => browser.get(testsStoryUrl));

  it('should not show any styles on the text inside the tooltip', async () => {
    const firstButtonDataHook = 'first-button';
    const secondButtonDataHook = 'second-button';
    const firstButtonElementFinder = $(`[data-hook="${firstButtonDataHook}"]`);
    const secondButtonElementFinder = $(
      `[data-hook="${secondButtonDataHook}"]`,
    );

    await waitForVisibilityOf(firstButtonElementFinder, 'Cannot find button');
    const buttonNextTestkit = buttonNextTestkitFactory({
      dataHook: firstButtonDataHook,
    });
    await buttonNextTestkit.click();

    expect(isFocused(secondButtonElementFinder)).toBe(true);
  });
});
