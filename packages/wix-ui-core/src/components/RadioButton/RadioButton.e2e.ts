import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {radioButtonTestkitFactory} from '../../testkit/protractor';

describe('RadioButton', () => {
  const storyUrl = getStoryUrl('Components', 'RadioButton');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('RadioButton renders correctly', () => {
    const dataHook = 'radio-story-1';
    const radio = radioButtonTestkitFactory({dataHook});
    return waitForVisibilityOf(radio.element(), 'Cannot find RadioButton');
  });
});
