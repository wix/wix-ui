import * as eyes from 'eyes.it';
import * as eventually from 'wix-eventually';
import { browser } from 'protractor';
import { getStoryUrl, waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { tooltipTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

const movedX = 10;

describe('Tooltip', () => {
  const storyUrl = getStoryUrl(Category.COMPONENTS, 'Tooltip Custom');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('moves tooltip relative to anchor according to props', async () => {
    const dataHookMoved = 'story-tooltip-right-moved';
    const driverMoved = tooltipTestkitFactory({ dataHook: dataHookMoved });
    await waitForVisibilityOf(
      driverMoved.element(),
      'Cannot find Tooltip Moved',
    );
    driverMoved.mouseEnter();
    expect(driverMoved.isContentElementExists()).toBeTruthy();
    const locationMoved = await driverMoved.getTooltipLocation();

    const dataHook = 'story-tooltip-right';
    const driver = tooltipTestkitFactory({ dataHook });
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

  eyes.it(
    'should render before or after cover according to zIndex',
    async () => {
      const dataHookZindexBefore = 'story-tooltip-zIndex-order-before';
      const driverZindexBefore = tooltipTestkitFactory({
        dataHook: dataHookZindexBefore,
      });
      await waitForVisibilityOf(
        driverZindexBefore.element(),
        'Cannot find Tooltip Zindex before',
      );
      await driverZindexBefore.mouseEnter();
      await eyes.checkWindow('tooltip hover with order before cover');

      const dataHookZindexAfter = 'story-tooltip-zIndex-order-after';
      const driverZindexAfter = tooltipTestkitFactory({
        dataHook: dataHookZindexAfter,
      });
      await waitForVisibilityOf(
        driverZindexBefore.element(),
        'Cannot find Tooltip Zindex after',
      );
      await driverZindexAfter.mouseEnter();
      await eyes.checkWindow('tooltip hover with order after cover');
    },
  );
});
