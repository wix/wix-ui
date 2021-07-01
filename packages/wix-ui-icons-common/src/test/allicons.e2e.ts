import * as eyes from "eyes.it";
import { getStoryUrl } from "wix-ui-test-utils/protractor";
import { $, browser, ExpectedConditions } from "protractor";
import { CLASSIC_EDITOR_CATEGORY, GENERAL_ICONS, SYSTEM_ICONS, WSR_CATEGORY, ON_STAGE_CATEGORY } from '../../stories/constants'

const largePageConfig = { width: 1024, height: 8000, enableSnapshotAtEnd: false }
const smallPageConfig = { width: 1024, height: 1000, enableSnapshotAtEnd: false }

describe("All icons", () => {
  eyes.it(
    `check WSR icons - General Icons`,
    async () => {
      const storyUrl = getStoryUrl(WSR_CATEGORY, GENERAL_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    }, largePageConfig
  );
  eyes.it(
    `check WSR icons - System Icons`,
    async () => {
      const storyUrl = getStoryUrl(WSR_CATEGORY, SYSTEM_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    }, smallPageConfig
  );
  eyes.it(
    `check Classic-Editor icons - General Icons`,
    async () => {
      const storyUrl = getStoryUrl(CLASSIC_EDITOR_CATEGORY, GENERAL_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },largePageConfig
  );
  eyes.it(
    `check Classic-Editor - System Icons`,
    async () => {
      const storyUrl = getStoryUrl(CLASSIC_EDITOR_CATEGORY, SYSTEM_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    }, smallPageConfig
  );
  eyes.it(
    `check On-Stage - General Icons`,
    async () => {
      const storyUrl = getStoryUrl(ON_STAGE_CATEGORY, GENERAL_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    }, largePageConfig
  );
  eyes.it(
    `check On-Stage - System Icons`,
    async () => {
      const storyUrl = getStoryUrl(ON_STAGE_CATEGORY, SYSTEM_ICONS);
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    }, smallPageConfig
  );
});
