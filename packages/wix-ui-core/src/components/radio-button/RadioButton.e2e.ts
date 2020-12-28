import * as eyes from 'eyes.it';
import { browser, Key } from 'protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { radioButtonTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('RadioButton', () => {
  const storyUrl = createStoryUrl({
    kind: Category.TESTS,
    story: 'RadioButton',
  });

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

  eyes.it('RadioButton onFocusByKeyboard works', async () => {
    const dataHook = 'radio-button-first';
    const radio = radioButtonTestkitFactory({ dataHook });
    return waitForVisibilityOf(radio.element(), 'Cannot find RadioButton').then(
      async () => {
        await radio.select();
        await radio.element().sendKeys(Key.ARROW_DOWN);
        const radioAfterFocusClicked = radioButtonTestkitFactory({
          dataHook: 'radio-button-focus-clicked',
        });
        expect(radioAfterFocusClicked).toBeDefined();
      },
    );
  });
});
