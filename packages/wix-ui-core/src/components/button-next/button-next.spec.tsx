import * as React from "react";

import { ReactDOMTestContainer } from "../../../test/dom-test-container";
// import { buttonNextTestkit } from "../../testkit";
import { buttonNextDriverFactory } from "./button-next.driver";
import { buttonNextPrivateDriverFactory } from "./button-next.driver.private";
import { ButtonNext } from "./";

describe.only("ButtonNext", () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(buttonNextDriverFactory);

  const createPrivateDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(buttonNextPrivateDriverFactory);

  // const createTestkitDriver = new ReactDOMTestContainer()
  //   .unmountAfterEachTest()
  //   .createUniRenderer(buttonNextTestkit);

  const dataHook = "button-next";

  describe(`'onClick' prop`, () => {
    it("should be called on click", async () => {
      const onClick = jest.fn();
      const driver = createDriver(
        <ButtonNext dataHook={dataHook} onClick={onClick} />
      );
      await driver.click();
      expect(onClick).toBeCalled();
    });

    it(`should not call 'onClick' when 'disabled'`, async () => {
      const onClick = jest.fn();
      const driver = createDriver(
        <ButtonNext dataHook={dataHook} onClick={onClick} disabled />
      );
      await driver.click();
      expect(onClick).not.toBeCalled();
    });
  });

  describe(`'children' prop`, () => {
    it("should render text", async () => {
      const text = "button";
      const driver = createDriver(
        <ButtonNext dataHook={dataHook} children={text} />
      );
      expect(await driver.getTextContent()).toBe(text);
    });
  });

  describe(`'suffixIcon' and 'prefixIcon' props`, () => {
    const suffix = <div data-hook="suffix">suffix</div>;
    const prefix = <div data-hook="prefix">prefix</div>;

    it(`should render 'suffix' when given`, async () => {
      const driver = createPrivateDriver(<ButtonNext suffixIcon={suffix} />);
      expect(await driver.suffixExists()).toBeTruthy();
      expect(await driver.prefixExists()).toBeFalsy();
    });

    it(`should render 'prefix' when given`, async () => {
      const driver = createPrivateDriver(<ButtonNext prefixIcon={prefix} />);
      expect(await driver.prefixExists()).toBeTruthy();
      expect(await driver.suffixExists()).toBeFalsy();
    });
  });

  // describe("Testkit", () => {
  //   it("should exist", async () => {
  //     const driver = createTestkitDriver(<ButtonNext />);
  //     expect(await driver.exists()).toBeTruthy();
  //   });
  // });
});
