import * as eyes from 'eyes.it';
import { $, browser } from 'protractor';
import {
  getStoryUrl,
  waitForVisibilityOf,
  mouseEnter,
  hasEllipsis,
} from 'wix-ui-test-utils/protractor';
import { tooltipTestkitFactory } from '../../../testkit/protractor';
import { testFolder, testNames, dataHooks } from './testSettings';

const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);

async function goToTestPageAndFindElement(testName, dataHook) {
  const storyUrl = getStoryUrl(testFolder, testName);
  await browser.get(storyUrl);

  const textElementFinder = byDataHook(dataHook);

  await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsisTooltip');

  return textElementFinder;
}

//TODO - it should use the tooltip driver
describe('EllipsisTooltip', () => {
  eyes.it(testNames.haveEllipsis, async () => {
    const textElementFinder = await goToTestPageAndFindElement(
      testNames.haveEllipsis,
      dataHooks.haveEllipsis,
    );
    expect(textElementFinder.getText()).toBe(
      'This text is going to get ellipsed',
    );

    expect(hasEllipsis(textElementFinder)).toEqual(true);

    await mouseEnter(textElementFinder);
    const tooltipTestkit = tooltipTestkitFactory({
      dataHook: dataHooks.haveEllipsis,
    });
    expect(tooltipTestkit.getContentElement().getText()).toBe(
      'This text is going to get ellipsed',
    );
  });

  eyes.it(testNames.noStylesInTooltip, async () => {
    const textElementFinder = await goToTestPageAndFindElement(
      testNames.noStylesInTooltip,
      dataHooks.noStylesInTooltip,
    );

    expect(textElementFinder.getText()).toBe(
      'This text is going to get ellipsed',
    );

    expect(hasEllipsis(textElementFinder)).toEqual(true);
    await mouseEnter(textElementFinder);
    const tooltipTestkit = tooltipTestkitFactory({
      dataHook: dataHooks.noStylesInTooltip,
    });
    expect(tooltipTestkit.getContentElement().getText()).toBe(
      'This text is going to get ellipsed',
    );
  });

  eyes.it(testNames.noEllipsis, async () => {
    const textElementFinder = await goToTestPageAndFindElement(
      testNames.noEllipsis,
      dataHooks.noEllipsis,
    );

    expect(hasEllipsis(textElementFinder)).toBe(false);

    await mouseEnter(textElementFinder);
    const tooltipTestkit = tooltipTestkitFactory({
      dataHook: dataHooks.noEllipsis,
    });

    expect(tooltipTestkit.isContentElementExists()).toEqual(false);
  });
});
