import * as React from 'react';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import * as eventually from 'wix-eventually';
import { reactUniDriver, UniDriver } from 'unidriver';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { Avatar } from '.';
import { avatarDriverFactory } from './avatar.driver';
import styles from './avatar.st.css';

/** jsdom simulates loading of the image regardless of the src URL */
const TEST_IMG_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const INVALID_TEST_IMG_URL = '12345';
const ICON_AS_TEXT = <span>XXXXX</span>;

describe('Avatar', () => {
  const testContainer = new ReactDOMTestContainer()
    .unmountAfterEachTest();

  const createDriver = testContainer.createUniRenderer(avatarDriverFactory);
  const createDriverFromContainer = () => {
    const base = reactUniDriver(testContainer.componentNode);
    return avatarDriverFactory(base);
  }
    
  const expectImgLoadedAtSomePoint = (driver) => eventually(async () => expect((await driver.getContentType()) === 'image').toBeFalsy());

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
      await expectImgLoadedAtSomePoint(driver);
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
        await expectImgLoadedAtSomePoint(driver);
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

    it('should have a default \'alt\' value when image is displayed', async () => {
      const dataHook = 'avatar_test_image';
      testContainer.renderSync(
        <Avatar 
          name="John Doe" 
          imgProps={{src:TEST_IMG_URL, ['data-hook']: dataHook}} 
        />);
      eventually(() => {
        const imgElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
        expect(imgElem.getAttribute('alt')).toBe('John Doe');
      });
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
      eventually(() => {
        const imgElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
        expect(imgElem.getAttribute('alt')).toBe(alt);
      });
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
      eventually(() => {
        const imgElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
        expect(imgElem.getAttribute('src')).toBe(TEST_IMG_URL);
      });
    });
  });

  describe(`Styling`, () => {
    describe('content pseudo element', () => {
      it('should have content class when text displayed', async () => {
        testContainer.renderSync(<Avatar text="JD"/>);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(utils.select('.content').textContent).toBe('JD');
      });
      
      it('should have content class when icon displayed', async () => {
        testContainer.renderSync(<Avatar icon={ICON_AS_TEXT}/>);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(utils.select('.content').textContent).toBe('XXXXX');
      });
      
      it('should have content class when image displayed', async () => {
        testContainer.renderSync(<Avatar imgProps={{ src:TEST_IMG_URL }}/>);
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        eventually(() => {
          expect(utils.select('.content').getAttribute('src')).toBe(TEST_IMG_URL);
        });
      });
    });
      
    describe('imgLoaded state', () => {
      it('should have imgLoaded', () => {
        testContainer.renderSync(
          <Avatar imgProps={{ src:TEST_IMG_URL }} />
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        eventually(() => {
          expect(utils.hasStyleState(testContainer.componentNode, 'imgLoaded')).toBeTruthy();
        });
      });

      it('should NOT have imgLoaded when displaying text', () => {
        testContainer.renderSync(
          <Avatar name="John Doe" />
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(utils.hasStyleState(testContainer.componentNode, 'imgLoaded')).toBeFalsy();
      });

      it('should NOT have imgLoaded when img is not loaded yet', () => {
        testContainer.renderSync(
          <Avatar imgProps={{ src:INVALID_TEST_IMG_URL }} />
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        eventually(() => {
          expect(utils.hasStyleState(testContainer.componentNode, 'imgLoaded')).toBeFalsy();
        });
      });
    });

    describe('contentType state', () => {
      it('should be text', () => {
        testContainer.renderSync(
          <Avatar text="JD" />
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(utils.getStyleState(testContainer.componentNode, 'contentType')).toBe('text');
      });

      it('should be icon', () => {
        testContainer.renderSync(
          <Avatar icon={ICON_AS_TEXT} />
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        expect(utils.getStyleState(testContainer.componentNode, 'contentType')).toBe('icon');
      });

      it('should be image', () => {
        testContainer.renderSync(
          <Avatar imgProps={{ src:TEST_IMG_URL }}  />
        );
        const utils = new StylableDOMUtil(styles, testContainer.componentNode);
        eventually(() => {
          expect(utils.getStyleState(testContainer.componentNode, 'contentType')).toBe('image');
        });
      });
    });
  });
});
