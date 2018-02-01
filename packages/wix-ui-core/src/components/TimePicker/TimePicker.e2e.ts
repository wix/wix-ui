import {browser} from 'protractor';
import {getStoryUrl} from 'wix-ui-test-utils';

describe('TimePicker', () => {
  const storyUrl = getStoryUrl('Components', 'TimePicker');

  beforeEach(() => browser.get(storyUrl));
});
