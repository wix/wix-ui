import * as eyes from 'eyes.it';
import { $, browser } from 'protractor';
import {
  createStoryUrl,
  hasEllipsis,
  mouseEnter,
  mouseLeave,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { tooltipTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('EllipsedTooltip', () => {
  const storyUrl = createStoryUrl({
    kind: Category.HOCS,
    story: 'EllipsedTooltip',
  });

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should have ellipsis when text overflows', async () => {
    const dataHook = 'ellipsedTooltip-without-tooltip';
    const textElementFinder = $(`[data-hook="${dataHook}"]`);

    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');

    expect(await textElementFinder.getText()).toBe(
      'This text is going to get ellipsed',
    );
    expect(await hasEllipsis(textElementFinder)).toBe(true);
  });

  eyes.it('should show the full text inside the tooltip', async () => {
    const dataHook = 'ellipsedTooltip-with-tooltip';
    const textElementFinder = $(`[data-hook="${dataHook}"]`);

    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');

    expect(await textElementFinder.getText()).toBe(
      'This text is going to get ellipsed',
    );

    expect(await hasEllipsis(textElementFinder)).toBe(true);

    await mouseEnter(textElementFinder);
    const tooltipTestkit = tooltipTestkitFactory({ dataHook });

    expect(await tooltipTestkit.getContentElement().getText()).toBe(
      'This text is going to get ellipsed',
    );
  });

  eyes.it(
    'should not show any styles on the text inside the tooltip',
    async () => {
      const testsStoryUrl = createStoryUrl({
        kind: Category.TESTS,
        story: 'EllipsedTooltip',
      });
      await browser.get(testsStoryUrl);

      const dataHook = 'custom-ellipsedTooltip-with-tooltip';
      const textElementFinder = $(`[data-hook="${dataHook}"]`);

      await waitForVisibilityOf(
        textElementFinder,
        'Cannot find EllipsedTooltip',
      );

      expect(await textElementFinder.getText()).toBe(
        'This text is going to get ellipsed',
      );

      expect(await hasEllipsis(textElementFinder)).toBe(true);
      await mouseEnter(textElementFinder);
      const tooltipTestkit = tooltipTestkitFactory({ dataHook });
      expect(await tooltipTestkit.getContentElement().getText()).toBe(
        'This text is going to get ellipsed',
      );
    },
  );

  eyes.it(
    'should not show the tooltip when the text is not ellipsed',
    async () => {
      const dataHook = 'ellipsedTooltip-not-ellipsed';
      const textElementFinder = $(`[data-hook="${dataHook}"]`);

      await waitForVisibilityOf(
        textElementFinder,
        'Cannot find EllipsedTooltip',
      );

      expect(await hasEllipsis(textElementFinder)).toBe(false);

      await mouseEnter(textElementFinder);
      const tooltipTestkit = tooltipTestkitFactory({ dataHook });

      expect(await tooltipTestkit.isContentElementExists()).toBe(false);
    },
  );

  xit('should work when resizing the window', async () => {
    const dataHook = 'ellipsedTooltip-not-ellipsed';
    const textElementFinder = $(`[data-hook="${dataHook}"]`);

    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');

    const tooltipTestkit = tooltipTestkitFactory({ dataHook });

    expect(await hasEllipsis(textElementFinder)).toBe(false);
    expect(await tooltipTestkit.isContentElementExists()).toBe(false);

    const originalWindowSize = await browser.driver.manage().window().getSize();

    await browser.driver.manage().window().setSize(250, 900);
    expect(await hasEllipsis(textElementFinder)).toBe(true);

    await mouseEnter(textElementFinder);
    expect(await tooltipTestkit.isContentElementExists()).toBe(true);
    await mouseLeave();

    await browser.driver
      .manage()
      .window()
      .setSize(originalWindowSize.width, originalWindowSize.height);

    expect(await hasEllipsis(textElementFinder)).toBe(false);
    expect(await tooltipTestkit.isContentElementExists()).toBe(false);
  });
});
