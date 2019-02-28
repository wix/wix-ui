import * as React from "react";
import { labelDriverFactory } from "./Label.driver";
import { labelUniDriverFactory } from "./Label.uni.driver";
import { ReactDOMTestContainer } from "../../../../test/dom-test-container";
import { isEnzymeTestkitExists } from "wix-ui-test-utils/enzyme";
import { isTestkitExists, isUniTestkitExists } from "wix-ui-test-utils/vanilla";
import { labelTestkitFactory } from "../../../testkit";
import { labelTestkitFactory as enzymeLabelTestkitFactory } from "../../../testkit/enzyme";
import { Label } from "./Label";
import { mount } from "enzyme";

describe("Label", () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  describe("[sync]", () => {
    runTests(testContainer.createLegacyRenderer(labelDriverFactory));
  });

  describe("[async]", () => {
    runTests(testContainer.createUniRenderer(labelUniDriverFactory));
  });

  function runTests(createDriver) {
    it("Renders children", async () => {
      const driver = createDriver(<Label>HELLO</Label>);

      expect(await driver.getLabelText()).toBe("HELLO");
    });

    it("takes an id prop", async () => {
      const driver = createDriver(<Label id="hey" />);

      expect(await driver.getId()).toBe("hey");
    });

    describe('for attribute', () => {
      it("takes an htmlFor prop", async () => {
        const driver = createDriver(<Label for="hey" />);

        expect(await driver.getForAttribute()).toBe("hey");
      });

      it("shouldclick on Label takes an htmlFor prop", async () => {
        const driver = createDriver(<Label for="hey" />);

        expect(await driver.getForAttribute()).toBe("hey");
      });
    })  

    describe("ellipsis attribute", () => {
      it("should not have ellipsis by default", async () => {
        const driver = createDriver(<Label>Hello World</Label>);
        expect(await driver.hasEllipsis()).toBeFalsy();
      });

      it("should have ellipsis", async () => {
        const driver = createDriver(<Label ellipsis>Hello World</Label>);
        expect(await driver.hasEllipsis()).toBeTruthy();
      });
    });

    it("takes a disabled prop", async () => {
      const driver = createDriver(<Label disabled />);

      expect(await driver.isDisabled()).toBe(true);
    });

    it("should not be disabled by default", async () => {
      const driver = createDriver(<Label />);

      expect(await driver.isDisabled()).toBe(false);
    });
  }

  describe("testkit", () => {
    it("should exist", () => {
      expect(isTestkitExists(<Label />, labelTestkitFactory)).toBe(true);
    });
  });

  describe("enzyme testkit", () => {
    it("should exist", () => {
      expect(
        isEnzymeTestkitExists(<Label />, enzymeLabelTestkitFactory, mount)
      ).toBe(true);
    });
  });
});
