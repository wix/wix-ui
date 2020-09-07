import * as eyes from "eyes.it";
import { getStoryUrl } from "wix-ui-test-utils/protractor";
import { $, browser, ExpectedConditions } from "protractor";

describe("All icons", () => {
  eyes.it(`check icons - All`, async () => {
    const storyUrl = getStoryUrl("Icons", "All");
    browser.get(storyUrl);
    await browser.wait(
      ExpectedConditions.presenceOf($(`[data-hook="icons-list"]`))
    );
  });
});
