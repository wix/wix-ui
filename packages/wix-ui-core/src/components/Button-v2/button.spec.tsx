import * as React from "react";
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import { buttonDriverFactory } from "./Button.driver";
import { Button } from "./";

describe("Button", () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(buttonDriverFactory);

  describe("onClick prop", () => {
    it("should be called on click", () => {
      const onClick = jest.fn();
      const driver = createDriver(<Button onClick={onClick} />);
      driver.click();
      expect(onClick).toBeCalled();
    });
  });
});
