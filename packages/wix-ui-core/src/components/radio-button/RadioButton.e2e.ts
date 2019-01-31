import * as eyes from 'eyes.it';
import { browser } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { radioButtonTestkitFactory } from '../../testkit/protractor';

describe('RadioButton', () => {
  const storyUrl = createStoryUrl({ kind: 'Components', story: 'RadioButton' });

  beforeEach(() => browser.get(storyUrl));

  eyes.it('RadioButton renders and selected upon click', async () => {
    const dataHook = 'radio-story-2';
    const radio = radioButtonTestkitFactory({ dataHook });
    return waitForVisibilityOf(radio.element(), 'Cannot find RadioButton').then(
      async () => {
        await expect(radio.isSelected()).toBeFalsy();
        radio.select();
        await expect(radio.isSelected()).toBeTruthy();
      },
    );
  });
});
