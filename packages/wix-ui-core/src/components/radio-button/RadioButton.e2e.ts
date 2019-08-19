import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import { getStoryUrl, waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { radioButtonTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('RadioButton', () => {
  const storyUrl = getStoryUrl(Category.COMPONENTS, 'RadioButton');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('RadioButton renders and selected upon click', async () => {
    const dataHook = 'radio-story-2';
    const radio = radioButtonTestkitFactory({ dataHook });
    return waitForVisibilityOf(radio.element(), 'Cannot find RadioButton').then(
      async () => {
        expect(await radio.isSelected()).toBeFalsy();
        await radio.select();
        expect(await radio.isSelected()).toBeTruthy();
      },
    );
  });
});
