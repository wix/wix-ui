import * as eyes from 'eyes.it';
import { $, browser } from 'protractor';
import {
  getStoryUrl,
  waitForVisibilityOf,
  mouseEnter,
  hasEllipsis,
} from 'wix-ui-test-utils/protractor';
import { tooltipTestkitFactory } from '../../../testkit/protractor';
import {
  testFolder,
  testNames,
  dataHooks,
  dataHooksContent,
} from './testSettings';

const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);

async function goToTestPage(testName) {
  const storyUrl = getStoryUrl(testFolder, testName);
  await browser.get(storyUrl);
}

//TODO - need to create a driver for it
describe('EllipsisTooltip', () => {
  eyes.it(testNames.haveEllipsis, async () => {
    goToTestPage(testNames.haveEllipsis);

    const textContentElement = byDataHook(dataHooksContent.haveEllipsis);
    expect(textContentElement.getText()).toBe(
      'This text is going to get ellipsed',
    );
    expect(hasEllipsis(textContentElement)).toEqual(true);

    await mouseEnter(textContentElement);
    const tooltipTestkit = tooltipTestkitFactory({
      dataHook: dataHooks.haveEllipsis,
    });
    expect(tooltipTestkit.getContentElement().getText()).toBe(
      'This text is going to get ellipsed',
    );
  });

  eyes.it(testNames.noStylesInTooltip, async () => {
    await goToTestPage(testNames.noStylesInTooltip);

    const textContentElement = byDataHook(dataHooksContent.noStylesInTooltip);
    expect(textContentElement.getText()).toBe(
      'This text is going to get ellipsed',
    );
    expect(hasEllipsis(textContentElement)).toEqual(true);

    await mouseEnter(textContentElement);
    const tooltipTestkit = tooltipTestkitFactory({
      dataHook: dataHooks.noStylesInTooltip,
    });
    expect(tooltipTestkit.getContentElement().getText()).toBe(
      'This text is going to get ellipsed',
    );
  });

  eyes.it(testNames.noEllipsis, async () => {
    await goToTestPage(testNames.noEllipsis);

    const textContentElement = byDataHook(dataHooksContent.noEllipsis);
    expect(hasEllipsis(textContentElement)).toEqual(false);
    await mouseEnter(textContentElement);
    const tooltipTestkit = tooltipTestkitFactory({
      dataHook: dataHooks.noEllipsis,
    });

    expect(tooltipTestkit.isContentElementExists()).toEqual(false);
  });
});
