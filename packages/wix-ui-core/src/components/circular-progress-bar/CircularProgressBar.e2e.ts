import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {circularProgressBarTestkitFactory, CircularProgressBarDriver} from '../../testkit/protractor';
import {Key} from 'selenium-webdriver';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {CircularProgressBarProps} from './CircularProgressBar';

describe('CircularProgressBar', () => {
  const storyUrl = getStoryUrl('Components', 'CircularProgressBar');
  const dataHook = 'circular-progress-bar';
  let driver: CircularProgressBarDriver;

  beforeAll(async () => {
    browser.get(storyUrl)
    driver = circularProgressBarTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find CircularProgressBar');
  });

  beforeEach(async () => {
    driver = circularProgressBarTestkitFactory({dataHook});
    return autoExampleDriver.reset();
  });

  eyes.it('should update arc according to progress', async () => {
    const progress = 90;
    const props = {value: progress};

    await autoExampleDriver.setProps(props);

    return waitForVisibilityOf(driver.element(), 'Cannot find CircularProgressBar');
  });

  eyes.it('should show progress indication percentage value', async () => {
    const progress = 10;
    const props = {showProgressIndication: true, value: progress};

    await autoExampleDriver.setProps(props);

    expect(await driver.progressIndicationValue()).toBe(`${progress}%`);
  });
});
