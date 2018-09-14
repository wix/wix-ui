import * as React from "react";
import * as ReactDOM from "react-dom";
import { reactUniDriver } from "unidriver";

import { buttonNextTestkit } from "../../testkit";
import { buttonNextDriver } from "./button-next.driver";
import { buttonNextPrivateDriver } from "./button-next.driver.private";
import { ButtonNext } from "./";

describe("ButtonNext", () => {
  const renderApp = (element: JSX.Element) => {
    const div = document.createElement("div");
    ReactDOM.render(element, div);
    return div;
  };

  //TODO abstract these to support unmounting etc.
  const createDriver = (element: JSX.Element) => {
    const app = renderApp(element);
    const base = reactUniDriver(app);
    return buttonNextDriver(base);
  };

  const createPrivateDriver = (element: JSX.Element) => {
    const app = renderApp(element);
    const base = reactUniDriver(app);
    return buttonNextPrivateDriver(base);
  };

  const createTestkitDriver = (element: JSX.Element) => {
    const app = renderApp(element);
    const base = reactUniDriver(app);
    return buttonNextTestkit(base);
  };

  describe("onClick prop", () => {
    it("should be called on click", async () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonNext onClick={onClick} />);
      await driver.click();
      expect(onClick).toBeCalled();
    });

    it(`should not call onClick when 'disabled'`, async () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonNext onClick={onClick} disabled />);
      await driver.click();
      expect(onClick).not.toBeCalled();
    });
  });

  describe(`'children' prop`, () => {
    it("should render text", async () => {
      const text = "button";
      const driver = createDriver(<ButtonNext children={text} />);
      expect(await driver.getTextContent()).toBe(text);
    });
  });

  describe("suffixIcon and prefixIcon props", () => {
    const suffix = <div>suffix</div>;
    const prefix = <div>prefix</div>;
    it("should render suffix when given", async () => {
      const driver = createPrivateDriver(<ButtonNext suffixIcon={suffix} />);
      expect(await driver.suffixExists()).toBeTruthy();
      expect(await driver.prefixExists()).toBeFalsy();
    });

    it("should render prefix when given", async () => {
      const driver = createPrivateDriver(<ButtonNext prefixIcon={prefix} />);
      expect(await driver.prefixExists()).toBeTruthy();
      expect(await driver.suffixExists()).toBeFalsy();
    });
  });

  describe("Testkit", () => {
    it("should exist", async () => {
      const driver = createTestkitDriver(<ButtonNext />);
      expect(await driver.exists()).toBeTruthy();
    });
  });
});
