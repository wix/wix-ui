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

  it('RadioButton onFocusByKeyboard works', async () => {
    const dataHookFirst = 'radio-button-first';
    const dataHookSecond = 'radio-button-second';
    const radioFirst = radioButtonTestkitFactory({ dataHook: dataHookFirst });
    const radioSecond = radioButtonTestkitFactory({ dataHook: dataHookSecond });
    return waitForVisibilityOf(
      radioFirst.element(),
      'Cannot find RadioButton',
    ).then(async () => {
      expect(await radioSecond.isSelected()).toBeFalsy();
      browser
        .actions()
        .sendKeys(
          Key.TAB,
          Key.ARROW_DOWN,
          Key.ARROW_DOWN,
          Key.ARROW_DOWN,
          Key.ARROW_DOWN,
        )
        .perform();
      expect(await radioSecond.isSelected()).toBeTruthy();
    });
  });
});
