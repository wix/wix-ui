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

  eyes.it('should progress as value increases', async () => {
    const expectedProgress = 90;

    await autoExampleDriver.setProps({value: expectedProgress});
    const foregroundArcValue = await driver.getArcValue();

    expect(foregroundArcValue).toBe(expectedProgress);
  });

  eyes.it('should show empty progress as value less than 0', async () => {
    const expectedProgress = 0;
    const valueLessThan0 = -1;

    await autoExampleDriver.setProps({value: valueLessThan0});
    const foregroundArcValue = await driver.getArcValue();

    expect(foregroundArcValue).toBe(expectedProgress);
  });

  eyes.it('should show exactly full progress as value greater than 100', async () => {
    const expectedProgress = 100;
    const valueGreaterThan100 = 101;

    await autoExampleDriver.setProps({value: valueGreaterThan100});
    const foregroundArcValue = await driver.getArcValue();

    expect(foregroundArcValue).toBe(expectedProgress);
  });

  eyes.it('should show progress indicator percentages', async () => {
    const props: CircularProgressBarProps = {showProgressIndication: true, value: 10};
    await autoExampleDriver.setProps(props);
    expect(await driver.progressIndicationValue()).toBe('10%');
  });
});
