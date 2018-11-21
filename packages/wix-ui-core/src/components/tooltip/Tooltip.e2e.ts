import * as eyes from 'eyes.it';
import * as eventually from 'wix-eventually';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {tooltipTestkitFactory} from '../../testkit/protractor';

const movedX = 10;

describe('Tooltip', () => {
  const storyUrl = getStoryUrl('Components', 'Tooltip Custom');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('moves tooltip relative to anchor according to props', async () => {
    const dataHookMoved = 'story-tooltip-right-moved';
    const driverMoved = tooltipTestkitFactory({dataHook: dataHookMoved});
    await waitForVisibilityOf(driverMoved.element(), 'Cannot find Tooltip Moved');
    driverMoved.mouseEnter();
    expect(driverMoved.isContentElementExists()).toBeTruthy();
    const locationMoved = await driverMoved.getTooltipLocation();

    const dataHook = 'story-tooltip-right';
    const driver = tooltipTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Tooltip');
    driver.mouseEnter();
    expect(driver.isContentElementExists()).toBeTruthy();
    const location = await driver.getTooltipLocation();

    expect(locationMoved.x - (location.x + movedX)).toBeLessThan(1e-3);

    expect(driver.getTargetElement().getText()).toBe('Hover me for a tooltip!');
    expect(driver.getContentElement().getText()).toBe('This is my tooltip');
    driver.mouseLeave();
    await browser.sleep(1000);
    await eventually(() => expect(driver.isContentElementExists()).toBeFalsy());
  });
});
