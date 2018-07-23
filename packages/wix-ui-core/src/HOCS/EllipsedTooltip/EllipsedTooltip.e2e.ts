import * as eyes from 'eyes.it';
import * as eventually from 'wix-eventually';
import {$, browser, element} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {mouseEnter, mouseLeave} from 'wix-ui-test-utils/protractor';
import {tooltipTestkitFactory} from './../../testkit/protractor';
import {hasEllipsis} from 'wix-ui-test-utils/protractor';

describe('EllipsedTooltip', () => {
  const storyUrl = getStoryUrl('HOCS', 'EllipsedTooltip');

  beforeAll(() => browser.get(storyUrl));

  eyes.it('should have ellipsis when text overflows', async () => {
    const textElementFinder = $('[data-hook="ellipsedTooltip-without-tooltip"]');
    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');
    
    expect(textElementFinder.getText()).toBe('This text is going to get ellipsed');

    expect(hasEllipsis(textElementFinder)).toEqual(true);
  });

  eyes.it('should have show the full text inside the tooltip', async () => {
    const textElementFinder = $('[data-hook="ellipsedTooltip-with-tooltip"]');
    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');
    
    expect(textElementFinder.getText()).toBe('This text is going to get ellipsed');
    
    expect(hasEllipsis(textElementFinder)).toEqual(true);

    mouseEnter(textElementFinder);
    const tooltipTestkit = tooltipTestkitFactory({dataHook: 'ellipsedTooltip-with-tooltip'});
    expect(tooltipTestkit.getContentElement().getText()).toBe('This text is going to get ellipsed');
  });

  eyes.it('should work when resizing the window', async () => {
    const textElementFinder = $('[data-hook="ellipsedTooltip-not-ellipsed"]');
    await waitForVisibilityOf(textElementFinder, 'Cannot find EllipsedTooltip');

    expect(hasEllipsis(textElementFinder)).toBe(false);
    browser.driver.manage().window().setSize(250, 900);
    expect(hasEllipsis(textElementFinder)).toBe(true);

    browser.driver.manage().window().maximize();
    expect(hasEllipsis(textElementFinder)).toBe(false);
  });
});
