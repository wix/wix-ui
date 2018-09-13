import * as React from "react";
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import { buttonNextDriverFactory } from "./button-next.driver";
import { buttonPrivateDriverFactory } from "./button-next.driver.private";
import { buttonNextTestkitFactory } from "../../testkit";
import { buttonNextTestkitFactory as enzymeButtonNextTestkitFactory } from "../../testkit/enzyme";
import { runTestkitExistsSuite } from "../../common/testkitTests";
import { ButtonNext } from "./";

describe("ButtonNext", () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(buttonNextDriverFactory);

  const createPrivateDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(buttonPrivateDriverFactory);

  describe("onClick prop", () => {
    it("should be called on click", () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonNext onClick={onClick} />);
      driver.click();
      expect(onClick).toBeCalled();
    });

    it(`should not call onClick when 'disabled'`, () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonNext onClick={onClick} disabled />);
      driver.click();
      expect(onClick).not.toBeCalled();
    });
  });

  describe("suffixIcon and prefixIcon props", () => {
    const suffix = <div>suffix</div>;
    const prefix = <div>prefix</div>;
    it("should render suffix when given", () => {
      const driver = createPrivateDriver(<ButtonNext suffixIcon={suffix} />);
      expect(driver.suffixExists()).toBeTruthy();
      expect(driver.prefixExists()).toBeFalsy();
    });

    it("should render prefix when given", () => {
      const driver = createPrivateDriver(<ButtonNext prefixIcon={prefix} />);
      expect(driver.prefixExists()).toBeTruthy();
      expect(driver.suffixExists()).toBeFalsy();
    });
  });

  describe(`'children' prop`, () => {
    it("should render text", () => {
      const text = "button";
      const driver = createDriver(<ButtonNext children={text} />);
      expect(driver.getTextContent()).toBe(text);
    });
  });

  runTestkitExistsSuite({
    Element: <ButtonNext />,
    testkitFactory: buttonNextTestkitFactory,
    enzymeTestkitFactory: enzymeButtonNextTestkitFactory
  });
});
