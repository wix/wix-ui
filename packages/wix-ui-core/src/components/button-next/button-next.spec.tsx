import * as React from "react";
import * as ReactDOM from "react-dom";

import { buttonNextDriverFactory } from "./button-next.driver";
import { buttonNextPrivateDriverFactory } from "./button-next.driver.private";
import { reactUniDriver } from "unidriver";
import { ButtonNext } from "./";

describe("ButtonNext", () => {
  const renderApp = (element: JSX.Element) => {
    const div = document.createElement("div");
    ReactDOM.render(element, div);
    return div;
  };

  const createDriver = (element: JSX.Element) => {
    const app = renderApp(element);
    const base = reactUniDriver(app);
    return buttonNextDriverFactory(base);
  };

  const createPrivateDriver = (element: JSX.Element) => {
    const app = renderApp(element);
    const base = reactUniDriver(app);
    return buttonNextPrivateDriverFactory(base);
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

  // TODO: for unidriver we need need new teskit check method
  // runTestkitExistsSuite({
  //   Element: <ButtonNext />,
  //   testkitFactory: buttonNextTestkitFactory,
  //   enzymeTestkitFactory: enzymeButtonNextTestkitFactory
  // });
});
