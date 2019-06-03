import { $, browser } from 'protractor';
import {
  getStoryUrl,
  waitForVisibilityOf,
  isFocused,
} from 'wix-ui-test-utils/protractor';
import {buttonNextTestkitFactory} from '../../testkit/protractor';

describe('FocusableHOC', () => {
  const testsStoryUrl = getStoryUrl('Tests', 'FocusableHOC');

  beforeEach(() => browser.get(testsStoryUrl));

  it(
      'should not show any styles on the text inside the tooltip',
      async () => {

        const firstButtonDataHook = 'first-button';
        const secondButtonDataHook = 'second-button';
        const firstButtonElementFinder = $(`[data-hook="${firstButtonDataHook}"]`);
        const secondButtonElementFinder = $(`[data-hook="${secondButtonDataHook}"]`);

        await waitForVisibilityOf(
            firstButtonElementFinder,
            'Cannot find button',
        );
        const buttonNextTestkit = buttonNextTestkitFactory({ dataHook: firstButtonDataHook });
        await buttonNextTestkit.click();

        expect(isFocused(secondButtonElementFinder)).toBe(true);
      },
  );
});
