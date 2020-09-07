import * as eyes from "eyes.it";
import { getStoryUrl } from "wix-ui-test-utils/protractor";
import { $, browser, ExpectedConditions } from "protractor";

describe("All icons", () => {
  eyes.it(
    `check icons - General Icons`,
    async () => {
      const storyUrl = getStoryUrl("Icons", "General Icons");
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },
    { width: 1024, height: 17500 }
  );
  eyes.it(
    `check icons - System Icons`,
    async () => {
      const storyUrl = getStoryUrl("Icons", "System Icons");
      browser.get(storyUrl);
      await browser.wait(
        ExpectedConditions.presenceOf($(`[data-hook="icon-list"]`))
      );
    },
    { width: 1024, height: 6000 }
  );
});
