import * as eyes from "eyes.it";
import { getStoryUrl } from "wix-ui-test-utils/protractor";
import { $, browser, ExpectedConditions } from "protractor";
import { CLASSIC_EDITOR_CATEGORY, GENERAL_ICONS, SYSTEM_ICONS, WSR_CATEGORY, WUT_CATEGORY } from '../../stories/constants'

describe("All icons", () => {
  eyes.it(
    `check WSR icons - General Icons`,
    async () => {
      const storyUrl = getStoryUrl(WSR_CATEGORY, GENERAL_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },
    { width: 1024, height: 7000 }
  );
  eyes.it(
    `check WSR icons - System Icons`,
    async () => {
      const storyUrl = getStoryUrl(WSR_CATEGORY, SYSTEM_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },
    { width: 1024, height: 1000 }
  );
  eyes.it(
    `check Classic-Editor icons - General Icons`,
    async () => {
      const storyUrl = getStoryUrl(CLASSIC_EDITOR_CATEGORY, GENERAL_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },
    { width: 1024, height: 7000 }
  );
  eyes.it(
    `check Classic-Editor - System Icons`,
    async () => {
      const storyUrl = getStoryUrl(CLASSIC_EDITOR_CATEGORY, SYSTEM_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },
    { width: 1024, height: 1000 }
  );
  eyes.it(
    `check WUT Icons`,
    async () => {
      const storyUrl = getStoryUrl(WUT_CATEGORY, WUT_CATEGORY);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },
    { width: 1024, height: 7000 }
  );
});
