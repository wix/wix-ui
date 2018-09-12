import * as React from "react";
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import { buttonDriverFactory } from "./button-v2.driver";
import { buttonPrivateDriverFactory } from "./button-v2.driver.private";
import { ButtonV2 } from "./";

describe("ButtonV2", () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(buttonDriverFactory);

  const createPrivateDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(buttonPrivateDriverFactory);

  describe("onClick prop", () => {
    it("should be called on click", () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonV2 onClick={onClick} />);
      driver.click();
      expect(onClick).toBeCalled();
    });
  });

  describe("suffixIcon and prefixIcon props", () => {
    const suffix = <div>suffix</div>;
    const prefix = <div>prefix</div>;
    it("should render suffix when given", () => {
      const driver = createPrivateDriver(<ButtonV2 suffixIcon={suffix} />);
      expect(driver.suffixExists()).toBeTruthy();
      expect(driver.prefixExists()).toBeFalsy();
    });

    it("should render prefix when given", () => {
      const driver = createPrivateDriver(<ButtonV2 prefixIcon={prefix} />);
      expect(driver.prefixExists()).toBeTruthy();
      expect(driver.suffixExists()).toBeFalsy();
    });
  });
});
