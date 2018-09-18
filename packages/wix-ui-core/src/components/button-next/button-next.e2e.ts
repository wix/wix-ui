import * as eyes from "eyes.it";
import { browser, ExpectedConditions as EC } from "protractor";
import { getStoryUrl } from "wix-ui-test-utils/protractor";
import * as autoExampleDriver from "wix-storybook-utils/AutoExampleDriver";
import { buttonNextTestkitFactory } from "../../testkit/protractor";

describe("ButtonNext", () => {
  const storyUrl = getStoryUrl("Components", "ButtonNext");
  const dataHook = "storybook-button";
  const driver = buttonNextTestkitFactory({ dataHook });

  beforeEach(async () => {
    await browser.get(storyUrl);
    await autoExampleDriver.reset();
  });

  eyes.it("it should exist", async () => {
    expect(await driver.exists()).toBe(true);
  });

  eyes.it("text should work", async () => {
    const text = "Button";
    await autoExampleDriver.setProps({ children: text });
    expect(await driver.getButtonTextContent()).toBe(text);
  });

  it("should call onClicked when clicked", async () => {
    await autoExampleDriver.setProps({
      onClick: () => {
        alert("clicked");
      }
    });
    driver.click();
    browser
      .wait(EC.alertIsPresent(), 2000, "Alert is not getting present :(")
      .then(() => {
        browser
          .switchTo()
          .alert()
          .accept();
      });
  });

  it("should get type submit", async () => {
    await autoExampleDriver.setProps({ type: "submit" });
    expect(await driver.getAttribute("type")).toBe("submit");
  });
});
