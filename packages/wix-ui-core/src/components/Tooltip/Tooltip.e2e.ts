import * as eyes from 'eyes.it';
import * as eventually from 'wix-eventually';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf, sleep} from 'wix-ui-test-utils';
import {tooltipTestkitFactory} from '../../testkit/protractor';

describe('Tooltip', () => {
  const storyUrl = getStoryUrl('Components', 'Tooltip');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display content when hover', async () => {
    const dataHook = 'story-tooltip-right';
    const driver = tooltipTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Tooltip');
    expect(driver.isTooltipExists()).toBeFalsy();
    expect(driver.getElementText()).toBe('Hover me for a tooltip!');
    driver.onMouseOver();
    expect(driver.isTooltipExists()).toBeTruthy();
    expect(driver.getTooltipText()).toBe('This is my tooltip\n');
    driver.onMouseLeave();
    await sleep(500);
    await eventually(() => expect(driver.isTooltipExists()).toBeFalsy());
  });
});
