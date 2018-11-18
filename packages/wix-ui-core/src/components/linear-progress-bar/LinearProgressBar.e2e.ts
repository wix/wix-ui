import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {linearProgressBarTestkitFactory, LinearProgressBarDriver} from '../../testkit/protractor';
import {Key} from 'selenium-webdriver';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {LinearProgressBarProps} from './LinearProgressBar';

describe('LinearProgresBar', () => {
  const storyUrl = getStoryUrl('Components', 'LinearProgressBar');
  const dataHook = 'progress-bar';
  let driver: LinearProgressBarDriver;

  beforeAll(async () => {
    browser.get(storyUrl)
    driver = linearProgressBarTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find LinearProgressBar');
  });

  beforeEach(async () => {
    driver = linearProgressBarTestkitFactory({dataHook});
    return autoExampleDriver.reset();
  });

  eyes.it('should progress as value increase', async () => {
    const expectedProgress = 90;

    await autoExampleDriver.setProps({value: expectedProgress});
    const foregroundBarWidth = await driver.getForegroundBarWidth();
    const backgroundBarWidth = await driver.getBackgroundBarWidth();
    const actualProgress = Math.round((foregroundBarWidth/backgroundBarWidth) * 100);

    expect(actualProgress).toBe(expectedProgress);
  });

  eyes.it('should show empty progress as value less than 0', async () => {
    const expectedProgress = 0;
    const valueLessThan0 = -1;

    await autoExampleDriver.setProps({value: valueLessThan0});
    const foregroundBarWidth = await driver.getForegroundBarWidth();

    expect(foregroundBarWidth).toBe(0);
  });

  eyes.it('should show exactly full progress as value greater than 100', async () => {
    const expectedProgress = 100;
    const valueGreaterThan100 = 101;

    await autoExampleDriver.setProps({value: valueGreaterThan100});
    const foregroundBarWidth = await driver.getForegroundBarWidth();
    const backgroundBarWidth = await driver.getBackgroundBarWidth();
    const actualProgress = Math.round((foregroundBarWidth/backgroundBarWidth) * 100);

    expect(actualProgress).toBe(expectedProgress);
  });

  eyes.it('should show progress indicator percentages', async () => {
    const props: LinearProgressBarProps = {showProgressIndication: true, value: 10};
    await autoExampleDriver.setProps(props);
    expect(await driver.progressIndicationValue()).toBe('10%');
  });
});
