import * as eyes from 'eyes.it';
import * as eventually from 'wix-eventually';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf, sleep} from 'wix-ui-test-utils';
import {tooltipTestkitFactory} from '../../testkit/protractor';

const movedX = 10;

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

describe('Tooltip Custom', () => {
  const storyUrl = getStoryUrl('Components', 'Tooltip Custom');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('moves tooltip relative to anchor according to props', async () => {
    const dataHookMoved = 'story-tooltip-right-moved';
    const driverMoved = tooltipTestkitFactory({dataHook: dataHookMoved});
    await waitForVisibilityOf(driverMoved.element(), 'Cannot find Tooltip Moved');
    driverMoved.onMouseOver();
    await sleep(500);
    expect(driverMoved.isTooltipExists()).toBeTruthy();
    const tooltipMoved = await driverMoved.getTooltip();
    const locationMoved = await tooltipMoved.getLocation();

    const dataHook = 'story-tooltip-right';
    const driver = tooltipTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Tooltip');
    driver.onMouseOver();
    await sleep(500);
    expect(driver.isTooltipExists()).toBeTruthy();
    const tooltip = await driver.getTooltip();
    const location = await tooltip.getLocation();

    expect(locationMoved.x - (location.x + movedX)).toBeLessThan(1e-3);
  });
});
