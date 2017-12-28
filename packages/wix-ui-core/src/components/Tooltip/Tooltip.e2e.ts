import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils';
import {tooltipTestkitFactory} from '../../testkit/protractor';

describe('Tooltip', () => {
  const storyUrl = getStoryUrl('Components', 'Tooltip');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display content when hover', () => {
    const dataHook = 'story-tooltip';
    const driver = tooltipTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Tooltip')
      .then(() => {
        expect(driver.isTooltipExists()).toBeFalsy();
        expect(driver.getElementText()).toBe('I need a tooltip');
        driver.onMouseOver();
        expect(driver.isTooltipExists()).toBeTruthy();
        expect(driver.getTooltipText()).toBe('This is my tooltip!');
        driver.onMouseLeave();
        expect(driver.isTooltipExists()).toBeFalsy();
      });
  });
});
