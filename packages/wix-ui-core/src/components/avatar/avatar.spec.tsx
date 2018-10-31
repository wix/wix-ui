import * as React from "react";
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import { Avatar } from ".";
import { avatarDriverFactory } from "./avatar.private.driver";

const TEST_IMG_URL = "http://localhost/123.png";

describe("Avatar", () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(avatarDriverFactory);

  describe(`'name' prop`, () => {
    it("should render generated initials as text content", async () => {
      const driver = createDriver(<Avatar name='John Doe' />);
      expect(await driver.getInitialsContent()).toBe('JD');
      expect(await driver.isContentType('initials')).toBe(true);
    });
  });

  describe(`'icon' prop`, () => {
    it("should render specified icon content", async () => {
      const driver = createDriver(<Avatar icon={<span>XXXX</span>} />);
      expect(await driver.getIconContent().text()).toBe('XXXX');
    });
  });

  describe(`'icon' prop`, () => {
    it("should render img tag with imgProps", async () => {
      const driver = createDriver(<Avatar imgProps={{src: TEST_IMG_URL}} />);
      expect(await driver.isImageTagExists()).toBeTruthy();
      expect((await driver.getImageContent().getNative()).getAttribute('src')).toBe(TEST_IMG_URL);
    });
  });

  describe(`content type resolution`, () => {
    it("should render an initials", async () => {
      const driver = createDriver(<Avatar initials='JD' />);
      expect(await driver.isContentType('initials')).toBe(true);
    });

    it("should render an icon", async () => {
      const driver = createDriver(<Avatar icon={<span>XXXXX</span>} />);
      expect(await driver.isContentType('icon')).toBe(true);
    });
    
    it("should render an image", async () => {
      const driver = createDriver(<Avatar imgProps={{src:TEST_IMG_URL}} />);
      expect(await driver.isContentType('image')).toBe(true);
    });
  });
});
