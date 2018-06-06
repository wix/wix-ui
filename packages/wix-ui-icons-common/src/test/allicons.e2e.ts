import * as eyes from 'eyes.it';
import {getStoryUrl} from 'wix-ui-test-utils/protractor';
import {browser, $, ExpectedConditions} from 'protractor';
import * as iconsList from './iconsList.json';

describe('All icons', () => {
  const storyUrl = getStoryUrl('Icons', 'Icons');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('check icons with', async () => {
    await browser.wait(ExpectedConditions.presenceOf($(`[data-hook="icons-list"]`)));
  });
});
