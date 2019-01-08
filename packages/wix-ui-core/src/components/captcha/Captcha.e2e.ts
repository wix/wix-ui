import {browser, $} from 'protractor';
import {createStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

describe('Captcha', () => {
  const storyUrl = createStoryUrl({kind: 'Components', story: 'Captcha'});

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  afterEach(()=> autoExampleDriver.remount());

  it('should load the component', async () => {
    const dataHook = 'captcha-test-example';
    const loadedDataHook = 'captcha-test-example-loaded';

    await waitForVisibilityOf($(`[data-hook=${dataHook}`));
    await waitForVisibilityOf($(`[data-hook=${loadedDataHook}`));

    expect(await $(`[data-hook=${loadedDataHook}]`).getText()).toEqual('loaded');
  });
});
