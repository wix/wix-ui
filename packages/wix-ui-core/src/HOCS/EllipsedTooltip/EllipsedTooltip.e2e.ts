import * as eyes from 'eyes.it';
import * as eventually from 'wix-eventually';
import {$, browser, element} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {mouseEnter, mouseLeave} from 'wix-ui-test-utils/protractor';
import {tooltipTestkitFactory} from './../../testkit/protractor';
import {hasEllipsis} from 'wix-ui-test-utils/protractor';

describe('EllipsedTooltip', () => {
  const storyUrl = getStoryUrl('HOCs', 'EllipsedTooltip');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should have ellipsis when text overflows', async () => {
    const dataHook = 'ellipsedTooltip-without-tooltip';
    const textElementFinder = $(`[data-hook="${dataHook}"]`);

    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');

    expect(textElementFinder.getText()).toBe('This text is going to get ellipsed');
    expect(hasEllipsis(textElementFinder)).toEqual(true);
  });

  eyes.it('should show the full text inside the tooltip', async () => {
    const dataHook = 'ellipsedTooltip-with-tooltip';
    const textElementFinder = $(`[data-hook="${dataHook}"]`);

    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');

    expect(textElementFinder.getText()).toBe('This text is going to get ellipsed');

    expect(hasEllipsis(textElementFinder)).toEqual(true);

    mouseEnter(textElementFinder);
    const tooltipTestkit = tooltipTestkitFactory({dataHook});
    expect(tooltipTestkit.getContentElement().getText()).toBe('This text is going to get ellipsed');
  });

  eyes.it('should not show the tooltip when the text is not ellipsed', async () => {
    const dataHook = 'ellipsedTooltip-not-ellipsed';
    const textElementFinder = $(`[data-hook="${dataHook}"]`);

    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');

    expect(hasEllipsis(textElementFinder)).toBe(false);

    mouseEnter(textElementFinder);
    const tooltipTestkit = tooltipTestkitFactory({dataHook});

    expect(tooltipTestkit.isContentElementExists()).toEqual(false);
  });

  eyes.it('should work when resizing the window', async () => {
    const dataHook = 'ellipsedTooltip-not-ellipsed';
    const textElementFinder = $(`[data-hook="${dataHook}"]`);

    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');

    const tooltipTestkit = tooltipTestkitFactory({dataHook});

    expect(hasEllipsis(textElementFinder)).toBe(false);
    expect(tooltipTestkit.isContentElementExists()).toEqual(false);

    browser.driver.manage().window().setSize(250, 900);
    expect(hasEllipsis(textElementFinder)).toBe(true);

    mouseEnter(textElementFinder);
    expect(tooltipTestkit.isContentElementExists()).toEqual(true);
    mouseLeave();

    browser.driver.manage().window().maximize();
    expect(hasEllipsis(textElementFinder)).toBe(false);
    expect(tooltipTestkit.isContentElementExists()).toEqual(false);
  });
});
