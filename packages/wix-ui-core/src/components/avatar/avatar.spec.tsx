import * as React from "react";
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import { Avatar } from ".";
import { avatarDriverFactory } from "./avatar.driver";

const TEST_IMG_URL = "http://localhost/123.png";

describe("Avatar", () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(avatarDriverFactory);
    
  it("should render an empty text by default", async () => {
    const driver = createDriver(<Avatar />);
    expect(await driver.isContentType('text')).toBe(true);
    expect(await driver.getTextContent()).toBe('');
  });
  
  describe(`content type resolution`, () => {

    it("should render a text", async () => {
      const driver = createDriver(<Avatar text='JD' />);
      expect(await driver.isContentType('text')).toBe(true);
    });

    it("should render a text when name given", async () => {
      const driver = createDriver(<Avatar name='John Doe' />);
      expect(await driver.isContentType('text')).toBe(true);
    });

    it("should render an icon", async () => {
      const driver = createDriver(<Avatar icon={<span>XXXXX</span>} />);
      expect(await driver.isContentType('icon')).toBe(true);
    });
    
    it("should render an image", async () => {
      const driver = createDriver(<Avatar imgProps={{src:TEST_IMG_URL}} />);
      expect(await driver.isContentType('image')).toBe(true);
    });

    it("should render an icon when given icon and text", async () => {
      const driver = createDriver(
        <Avatar 
          text='JD'
          icon={<span>XXXXX</span>} 
        />);
      expect(await driver.isContentType('icon')).toBe(true);
    });

    it("should render an image when given icon and image", async () => {
      const driver = createDriver(
        <Avatar 
          icon={<span>XXXXX</span>} 
          imgProps={{src:TEST_IMG_URL}}
        />);
      expect(await driver.isContentType('image')).toBe(true);
    });
  });

  describe(`'name' prop`, () => {
    it("should provide generated initials as text content", async () => {
      const driver = createDriver(<Avatar name='John Doe' />);
      expect(await driver.getTextContent()).toBe('JD');
    });

    it("should NOT override text content", async () => {
      const driver = createDriver(
        <Avatar 
          name='John Smith Junir Doe'
          text='JsD'
        />);
      expect(await driver.getTextContent()).toBe('JsD');
    });

    it("should have a default 'alt' value when image is displayed", async () => {
      const driver = createDriver(
        <Avatar 
          name="John Doe" 
          imgProps={{src:TEST_IMG_URL}} 
        />);
      expect((await driver.getImageContent().getNative()).getAttribute('alt')).toBe('John Doe');
    });

    it("should NOT override 'alt' value when image is displayed", async () => {
      const alt = 'Profile photo of John Doe';
      const driver = createDriver(
        <Avatar 
          name="John Doe" 
          imgProps={{src:TEST_IMG_URL, alt}} 
        />);
      expect((await driver.getImageContent().getNative()).getAttribute('alt')).toBe(alt);
    });
  });

  describe(`'icon' prop`, () => {
    it("should render specified icon content", async () => {
      const driver = createDriver(<Avatar icon={<span>XXXX</span>} />);
      expect(await driver.getIconContent().text()).toBe('XXXX');
    });
  });

  describe(`'imgProps' prop`, () => {
    it("should render img tag with imgProps", async () => {
      const driver = createDriver(<Avatar imgProps={{src: TEST_IMG_URL}} />);
      expect((await driver.getImageContent().getNative()).getAttribute('src')).toBe(TEST_IMG_URL);
    });
  });
});
