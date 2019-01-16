import * as React from 'react';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import * as eventually from 'wix-eventually';
import { reactUniDriver } from 'unidriver';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { Avatar , AvatarProps} from '.';
import { nameToInitials } from './util';
import { avatarDriverFactory } from './avatar.driver';
import styles from './avatar.st.css';

/** jsdom simulates loading of the image regardless of the src URL */
const TEST_IMG_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const INVALID_TEST_IMG_URL = '12345';
const PLACEHOLDER_AS_TEXT = <span>XXXXX</span>;

describe('Avatar Browser (image) tests', () => {
  const testContainer = new ReactDOMTestContainer()
    .unmountAfterEachTest();

  const createDriver = testContainer.createUniRenderer(avatarDriverFactory);

  const createDriverFromContainer = () => {
    const base = reactUniDriver(testContainer.componentNode);
    return avatarDriverFactory(base);
  }
    
  const expectImgEventuallyLoaded =driver => eventually(
    async () => expect((await driver.getContentType()) === 'image').toBeTruthy()
  );

  it('should render an image', async () => {
    const driver = createDriver(<Avatar imgProps={{src:TEST_IMG_URL}} />);
    await expectImgEventuallyLoaded(driver);
  });

  it('should render an image when given placeholder and image', async () => {
    const driver = createDriver(
      <Avatar 
        placeholder={PLACEHOLDER_AS_TEXT} 
        imgProps={{src:TEST_IMG_URL}}
      />);
      await expectImgEventuallyLoaded(driver);
  });

  it('should have a default \'alt\' value when image is displayed', async () => {
    const dataHook = 'avatar_test_image';
    testContainer.renderSync(
      <Avatar 
        name="John Doe" 
        imgProps={{src:TEST_IMG_URL, ['data-hook']: dataHook}} 
      />);
    await eventually(() => {
      const imgElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
      expect(imgElem.getAttribute('alt')).toBe('John Doe');
    });
  });

  it('should NOT override \'alt\' value when image is displayed', async () => {
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
    await eventually(() => {
      const imgElem = testContainer.componentNode.querySelector(`[data-hook="${dataHook}"]`);
      expect(imgElem.getAttribute('alt')).toBe(alt);
    });
  });
  
  it('should reset imgLoading state when src url changes', async () => {
    const dataHook = 'avatar_test_image';
    class AvatarWrapper extends React.Component<AvatarProps> {
      state = {srcUrl : TEST_IMG_URL}
      
      setUrl(url) {
        this.setState({srcUrl: url});
      }

      render() {
        return (
          <Avatar 
            imgProps={{
              src: this.state.srcUrl,
              ['data-hook']: dataHook,
            }} 
          />
        );
      }
    }
    
    let wrapper: any;

    testContainer.renderSync(
      <AvatarWrapper 
        ref={inst => wrapper = inst}
        imgProps={{
          src:TEST_IMG_URL,
          ['data-hook']: dataHook,
        }} 
      />);

    await eventually(async () => {
      const driver =  createDriverFromContainer();
      expect(await driver.isImageLoaded()).toBeTruthy();
    }, {timeout: 1000});

    wrapper.setUrl(INVALID_TEST_IMG_URL);

    await eventually(async () => {
      const driver =  createDriverFromContainer();
      expect(await driver.isImageLoaded()).toBeFalsy();
    }, {timeout: 1000});
  });

    
  it('should have content class when image displayed', async () => {
    testContainer.renderSync(<Avatar imgProps={{ src:TEST_IMG_URL }}/>);
    const utils = new StylableDOMUtil(styles, testContainer.componentNode);
    await eventually(() => {
      expect(utils.select('.content').getAttribute('src')).toBe(TEST_IMG_URL);
    });
  });
    
  it('should have imgLoaded', async () => {
    testContainer.renderSync(
      <Avatar imgProps={{ src:TEST_IMG_URL }} />
    );
    const utils = new StylableDOMUtil(styles, testContainer.componentNode);
    await eventually(() => {
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

  it('should NOT have imgLoaded when img is not loaded yet', async () => {
    testContainer.renderSync(
      <Avatar imgProps={{ src:INVALID_TEST_IMG_URL }} />
    );
    const utils = new StylableDOMUtil(styles, testContainer.componentNode);
    await eventually(() => {
      expect(utils.hasStyleState(testContainer.componentNode, 'imgLoaded')).toBeFalsy();
    }, {timeout: 1000});
  });

  it('should be image', async () => {
    testContainer.renderSync(
      <Avatar imgProps={{ src:TEST_IMG_URL }}  />
    );
    const utils = new StylableDOMUtil(styles, testContainer.componentNode);
    await eventually(() => {
      expect(utils.getStyleState(testContainer.componentNode, 'contentType')).toBe('image');
    });
  });
});

