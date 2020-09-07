import * as eyes from "eyes.it";
import { getStoryUrl } from "wix-ui-test-utils/protractor";
import { $, browser, ExpectedConditions } from "protractor";
import * as generalIcons from "../general/dist";
import * as systemIcons from "../system/dist";

const allIcons = [...Object.keys(generalIcons), ...Object.keys(systemIcons)];

describe("Each icon", () => {
  allIcons.forEach((iconName) => {
    eyes.it(`check icons - ${iconName}`, async () => {
      const storyUrl = getStoryUrl("Icons/Each", iconName);
      browser.get(storyUrl);
      await browser.wait(ExpectedConditions.presenceOf($(`svg`)));
    });
  });
});
