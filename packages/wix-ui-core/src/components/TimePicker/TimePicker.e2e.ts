import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {timePickerTestkitFactory} from '../../testkit/protractor';

describe('TimePicker', () => {
  const storyUrl = getStoryUrl('Components', 'TimePicker');
  const dataHook = 'storybook-timepicker';

  beforeEach(async () => await browser.get(storyUrl));

  eyes.it('should exist', async () => {
    const driver = timePickerTestkitFactory({dataHook});

    await waitForVisibilityOf(await driver.element(), 'Cannot find TimePicker');
  });
});
