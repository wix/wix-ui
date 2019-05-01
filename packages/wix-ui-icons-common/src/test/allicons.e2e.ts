import * as eyes from 'eyes.it';
import {getStoryUrl} from 'wix-ui-test-utils/protractor';
import {$, browser, ExpectedConditions} from 'protractor';
import {ICON_SIZES, ICON_TYPES} from '../../stories/Icons';

describe('All icons', () => {
  Object.keys(ICON_TYPES).forEach(type => Object.keys(ICON_SIZES).forEach(size => {
    eyes.it(`check icons - ${ICON_TYPES[type]} - ${ICON_SIZES[size]}`, async () => {
      const storyUrl = getStoryUrl(`Icons/${ICON_TYPES[type]}`, ICON_SIZES[size]);
      browser.get(storyUrl);
      await browser.wait(ExpectedConditions.presenceOf($(`[data-hook="icons-list"]`)));
    });
  }));
});
