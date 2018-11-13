import * as React from 'react';
import {StylableDOMUtil} from '@stylable/dom-test-kit';

import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { Avatar } from '.';
import { avatarDriverFactory } from './avatar.driver';
import styles from './avatar.st.css';

const TEST_IMG_URL = 'http://localhost/123.png';
const ICON_AS_TEXT = <span>XXXXX</span>;

describe('Avatar', () => {
  const testContainer = new ReactDOMTestContainer()
    .unmountAfterEachTest();

  const createDriver = testContainer.createUniRenderer(avatarDriverFactory);
    
  it('should render an empty text by default', async () => {
    const driver = createDriver(<Avatar />);
    expect((await driver.getContentType()) === 'text').toBe(true);
    expect(await driver.getTextContent()).toBe('');
  });
  
  describe(`content type resolution`, () => {

    it('should render a text', async () => {
      const driver = createDriver(<Avatar text="JD" />);
      expect((await driver.getContentType()) === 'text').toBe(true);
    });

    it('should render a text when name given', async () => {
      const driver = createDriver(<Avatar name="John Doe" />);
      expect((await driver.getContentType()) === 'text').toBe(true);
    });

    it('should render an icon', async () => {
      const driver = createDriver(<Avatar icon={ICON_AS_TEXT} />);
      expect((await driver.getContentType()) === 'icon').toBe(true);
    });
    
    it('should render an image', async () => {
      const driver = createDriver(<Avatar imgProps={{src:TEST_IMG_URL}} />);
      expect((await driver.getContentType()) === 'image').toBe(true);
    });

    it('should render an icon when given icon and text', async () => {
      const driver = createDriver(
        <Avatar 
          text="JD"
          icon={ICON_AS_TEXT} 
        />);
      expect((await driver.getContentType()) === 'icon').toBe(true);
    });

    it('should render an image when given icon and image', async () => {
      const driver = createDriver(
        <Avatar 
          icon={ICON_AS_TEXT} 
          imgProps={{src:TEST_IMG_URL}}
        />);
      expect((await driver.getContentType()) === 'image').toBe(true);
    });
  });

  describe(`'name' prop`, () => {
    it('should provide generated initials as text content', async () => {
      const driver = createDriver(<Avatar name="John Doe" />);
      expect(await driver.getTextContent()).toBe('JD');
    });

    it('should NOT override text content', async () => {
      const driver = createDriver(
        <Avatar 
          name="John Smith Junir Doe"
          text="JsD"
        />);
      expect(await driver.getTextContent()).toBe('JsD');
    });

    it('should have a default \'alt\' value when image is displayed', () => {
      const dataHook = 'avatar_test_image';
      testContainer.renderSync(
        <Avatar 
          name="John Doe" 
          imgProps={{src:TEST_IMG_URL, ['data-hook']: dataHook}} 
        />);
      const imgElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
      expect(imgElem.getAttribute('alt')).toBe('John Doe');
    });

    it('should NOT override \'alt\' value when image is displayed', () => {
      const alt = 'Profile photo of John Doe';
      const dataHook = 'avatar_test_image';
      testContainer.renderSync(
        <Avatar 
          name="John Doe" 
          imgProps={{
            src:TEST_IMG_URL,
            ['data-hook']: dataHook,
            alt
          }} 
        />);
      const imgElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
      expect(imgElem.getAttribute('alt')).toBe(alt);
    });
  });

  describe(`'icon' prop`, () => {
    it('should render specified icon content', async () => {
      const dataHook = 'avatar_test_icon';
      testContainer.renderSync(
        <Avatar 
          icon={<span data-hook={dataHook}>XXXX</span>}
        />);
      const iconElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
      expect(iconElem.textContent).toBe('XXXX');
    });
  });

  describe(`'imgProps' prop`, () => {
    it('should render img tag with imgProps', async () => {
      const dataHook = 'avatar_test_image';
      testContainer.renderSync(
        <Avatar 
          imgProps={{
            src:TEST_IMG_URL,
            ['data-hook']: dataHook,
          }} 
        />);
      const imgElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
      expect(imgElem.getAttribute('src')).toBe(TEST_IMG_URL);
    });
  });

  describe(`Styling`, () => {
    it('should have only text class', async () => {
      testContainer.renderSync(<Avatar text="JD"/>);
      const utils = new StylableDOMUtil(styles, testContainer.componentNode);
      expect(utils.select('.text').textContent).toBe('JD');
      expect(utils.select('.icon')).toBe(null);
      expect(utils.select('.image')).toBe(null);
    });

    it('should have icon class', async () => {
      testContainer.renderSync(<Avatar icon={ICON_AS_TEXT}/>);
      const utils = new StylableDOMUtil(styles, testContainer.componentNode);
      expect(utils.select('.icon').textContent).toBe('XXXXX');
      expect(utils.select('.text')).toBe(null);
      expect(utils.select('.image')).toBe(null);
    });

    it('should have image class', async () => {
      testContainer.renderSync(
        <Avatar imgProps={{ src:TEST_IMG_URL }} />
      );
      const utils = new StylableDOMUtil(styles, testContainer.componentNode);
      expect(utils.select('.image').getAttribute('src')).toBe(TEST_IMG_URL);
      expect(utils.select('.icon')).toBe(null);
      expect(utils.select('.text')).toBe(null);
    });
  });

});
