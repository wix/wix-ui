import * as eyes from 'eyes.it';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {labelWithOptionsTestkitFactory} from '../../testkit/protractor';
import {browser} from 'protractor';

describe('LabelWithOptions', () => {
  const storyUrl = getStoryUrl('Components', 'LabelWithOptions');
  const dataHook = 'storybook-labelwithoptions';

  beforeEach(() => browser.get(storyUrl));

  eyes.it('should open the component and make selections', async () => {
    const driver = labelWithOptionsTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find LabelWithOptions');

    expect(driver.isContentElementExists()).toBe(false);

    driver.click();

    expect(driver.isContentElementExists()).toBe(true);
    expect(driver.dropdownContent().getOptionsCount()).toEqual(20);

    driver.dropdownContent().optionAt(0).click();
    driver.dropdownContent().optionAt(1).click();

    expect(driver.getLabelText()).toBe('value0, value1');
    driver.dropdownContent().optionAt(1).click();
    expect(driver.getLabelText()).toBe('value0');
  });
});
