import * as eyes from 'eyes.it';
import {browser, ExpectedConditions as EC} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {buttonTestkitFactory, ButtonDriver} from '../../testkit/protractor';

describe('Button', () => {
  const storyUrl = getStoryUrl('Components', 'Button');
  const dataHook = 'storybook-button';
  let driver: ButtonDriver;

  beforeEach(async () => {
    await browser.get(storyUrl);
    driver = buttonTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Button');
    await autoExampleDriver.reset();
  });

  eyes.it('should display correct text content', async () => {
    expect(await driver.getButtonTextContent()).toBe('I\'m a Button!');
  });

  describe('disabled', () => {
    it('should not be disabled by default', async () => {
      expect(await driver.isButtonDisabled()).toBeFalsy();
    });

    it('should be disabled', async () => {
      await autoExampleDriver.setProps({disabled: true});
      expect(await driver.isButtonDisabled()).toBeTruthy();
    });
  });

  it('should call onClicked when clicked', async () => {
    await autoExampleDriver.setProps({onClick: () => {alert('clicked'); }});
    driver.click();
    browser.wait(EC.alertIsPresent(), 2000, 'Alert is not getting present :(')
      .then(() => {
        browser.switchTo().alert().accept();
      });
  });
});
