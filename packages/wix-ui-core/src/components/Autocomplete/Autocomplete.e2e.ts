import * as eyes from 'eyes.it';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {autocompleteTestkitFactory} from '../../testkit/protractor';
import {browser} from 'protractor';
import * as eventually from 'wix-eventually';

describe('Autocomplete', () => {
  const storyUrl = getStoryUrl('Components', 'Autocomplete');
  const dataHook = 'storybook-autocomplete';

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should open autocomplete when it focused', async () => {
    const driver = autocompleteTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Autocomplete');

    expect(await driver.isContentElementExists()).toBe(false);

    await driver.focus();

    expect(await driver.isContentElementExists()).toBe(true);
    expect(await driver.dropdownContent().getOptionsCount()).toEqual(20);

    await driver.enterText('very');
    expect(await driver.dropdownContent().getOptionsCount()).toEqual(1);

    expect(await driver.dropdownContent().optionAt(0).getText()).toBe('This is a very very very very very long option');
  });

  eyes.it('should choose one of autocomplete items', async () => {
    const driver = autocompleteTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Autocomplete');

    driver.focus();
    driver.dropdownContent().optionAt(1).click();

    expect(driver.getText()).toBe('value1');
  });
});
