import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';

import {linkTestkitFactory} from '../../testkit/protractor';

const dataHook = 'storybook-link';

describe('Link', () => {
  browser.get(getStoryUrl('Components', 'Link'));

  eyes.it('should render', async () => {
    const driver = linkTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find <Link/>');

    expect(driver.element()).not.toBe(undefined);
  });
});
