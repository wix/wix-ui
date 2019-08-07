import * as eyes from 'eyes.it';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { addressInputTestkitFactory } from '../../testkit/protractor';
import { browser, $ } from 'protractor';
import { byDataHook } from '../../../test/utils/unidriver';
import { DataHooks } from '../../../stories/AddressInput/E2E';

describe('AddressInput', () => {
  const storyUrl = createStoryUrl({
    kind: 'Components',
    story: 'AddressInputE2E',
  });

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should display and select option', async () => {
    const driver = addressInputTestkitFactory({ dataHook: DataHooks.input });
    const $lagLng = $(byDataHook(DataHooks.latLng));
    const $fillStubBtn = $(byDataHook(DataHooks.fillStub));
    const $resetStubBtn = $(byDataHook(DataHooks.resetStub));
    await $fillStubBtn.click();
    await waitForVisibilityOf(driver.element(), 'Cannot find Input');
    await driver.enterText('n');
    await driver
      .dropdownContent()
      .optionAt(0)
      .click();
    const latLngTextContent = await $lagLng.getText();
    expect(latLngTextContent).toEqual('{"lat":40.7127753,"lng":-74.0059728}');
    await $resetStubBtn.click();
  });

  eyes.it('should style empty state using optionStyle', async () => {
    const driver = addressInputTestkitFactory({ dataHook: DataHooks.input });
    await waitForVisibilityOf(driver.element(), 'Cannot find Input');
    const $resetStubBtn = $(byDataHook(DataHooks.resetStub));
    await $resetStubBtn.click();
    await driver.enterText('ndaff3faxfc');
    const emptyStateMessage = await driver
      .dropdownContent()
      .optionAt(0)
      .getText();
    expect(emptyStateMessage).toEqual('No Results');
  });
});
