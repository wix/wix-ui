import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';

import {linkTestkitFactory} from '../../testkit/protractor';

describe('Link', () => {
  const storyUrl = getStoryUrl('Components', 'Link');
  const dataHook = 'storybook-link';
});
