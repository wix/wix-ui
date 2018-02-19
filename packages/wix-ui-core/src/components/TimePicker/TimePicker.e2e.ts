import {browser} from 'protractor';
import {getStoryUrl} from 'wix-ui-test-utils/protractor';

describe('TimePicker', () => {
  const storyUrl = getStoryUrl('Components', 'TimePicker');

  beforeEach(() => browser.get(storyUrl));
});
