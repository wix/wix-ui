import {browser, $} from 'protractor';
import {createStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {avatarTestkitFactory} from '../../testkit/protractor';
import {storySettings} from './storySettings';

const VALID_IMG_SRC = 'https://static.wixstatic.com/media/9ab0d1_8f1d1bd00e6c4bcd8764e1cae938f872~mv1.png'
const INVALID_IMG_SRC = 'https://static.wixstatic.com/media/1234321.jpg'

describe('Avatar', () => {
  const storyUrl = createStoryUrl({kind: storySettings.category, story: storySettings.storyName});

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  afterEach(()=> autoExampleDriver.remount());

  it('should show fallback text when image is not loaded', async () => {
    const dataHook = 'storybook-avatar';
    await autoExampleDriver.setProps({text: 'JD', imgProps: {src:INVALID_IMG_SRC}})
    await waitForVisibilityOf($(`[data-hook=${dataHook}`));
    const driver = avatarTestkitFactory({dataHook});

    expect(await driver.getContentType()).toBe('text');
    expect(await driver.isImageLoaded()).toBeFalsy();
    expect(await driver.getTextContent()).toBe('JD');
  });

  it('should show image loaded and then unloaded when img src changes', async () => {
    const dataHook = 'storybook-avatar';
    await autoExampleDriver.setProps({imgProps: {src:VALID_IMG_SRC}})
    await waitForVisibilityOf($(`[data-hook=${dataHook}`));
    const driver = avatarTestkitFactory({dataHook});
    
    await browser.wait(async ()=> (await driver.isImageLoaded()) === true, 2000, 'image should have been loaded');
    expect(await driver.isImageLoaded()).toBeTruthy();

    await autoExampleDriver.setProps({imgProps: {src:INVALID_IMG_SRC}});
    
    await browser.wait(async ()=> (await driver.isImageLoaded()) === false, 2000, 'image should NOT be loaded');
    expect(await driver.isImageLoaded()).toBeFalsy(); 
  });
});
