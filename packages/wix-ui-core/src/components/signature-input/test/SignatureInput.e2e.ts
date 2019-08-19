import * as eyes from 'eyes.it';
import { signatureInputTestkitFactory } from '../../../testkit/protractor';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';
import { browser } from 'protractor';
import { SIGNNATURE_INPUT_METADATA } from '../constants';
import { TEST_IDS } from './SignatureInputTestFixture';
import { Category } from '../../../../stories/utils';

const createDriver = () =>
  signatureInputTestkitFactory({ dataHook: TEST_IDS.ROOT });

const navigateToStory = ({ suffix = '' } = {}) => browser.get(storyUrl(suffix));

const storyUrl = suffix =>
  createStoryUrl({
    kind: Category.TESTS,
    story: SIGNNATURE_INPUT_METADATA.displayName + suffix,
  });

fdescribe('Signature Input', () => {
  it('should render correctly', async () => {
    await navigateToStory();
    const driver = createDriver();
    expect(await driver.exists()).toBe(true);
  });

  eyes.it('should intially be blank', async () => {
    await navigateToStory();
    createDriver();
  });

  eyes.it('should support drawing with black color by default', async () => {
    await navigateToStory();
    const driver = createDriver();
    const signaturePad = await driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
  });

  eyes.it('should support drawing with specific color', async () => {
    await navigateToStory({ suffix: 'Color' });
    const driver = createDriver();
    const signaturePad = await driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
  });

  eyes.it(
    'should fallback to drawing with black for invalid colors',
    async () => {
      await navigateToStory({ suffix: 'ColorInvalid' });
      const driver = createDriver();
      debugger;
      const signaturePad = await driver.getChildDriverByHook(TEST_IDS.PAD);
      await signaturePad.click();
    },
  );

  eyes.it('should support clearing', async () => {
    await navigateToStory();
    const driver = createDriver();
    const signaturePad = await driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
    const clearButton = await driver.getChildDriverByHook(
      TEST_IDS.CLEAR_BUTTON,
    );
    await clearButton.click();
  });
});
