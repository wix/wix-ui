import * as eyes from "eyes.it";
import { getStoryUrl } from "wix-ui-test-utils/protractor";
import { $, browser, ExpectedConditions } from "protractor";

describe("All icons", () => {
  eyes.it(
    `check WSR icons - General Icons`,
    async () => {
      const storyUrl = getStoryUrl("WSR Icons", "General Icons");
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
      const storyUrl = getStoryUrl("WSR Icons", "System Icons");
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
      const storyUrl = getStoryUrl("Classic-Editor Icons", "General Icons");
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
      const storyUrl = getStoryUrl("Classic-Editor Icons", "System Icons");
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },
    { width: 1024, height: 1000 }
  );
});
