import * as eyes from 'eyes.it';
import { signatureInputTestkitFactory } from '../../../testkit/protractor';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';
import { browser } from 'protractor';
import { SIGNATURE_INPUT_METADATA } from '../constants';
import { TEST_IDS } from './SignatureInputTestFixture';
import { Category } from '../../../../stories/utils';

const createDriver = () =>
  signatureInputTestkitFactory({ dataHook: TEST_IDS.ROOT });

const navigateToStory = ({ suffix = '' } = {}) => browser.get(storyUrl(suffix));

const storyUrl = (suffix: string) =>
  createStoryUrl({
    kind: Category.TESTS,
    story: SIGNATURE_INPUT_METADATA.displayName + suffix,
  });

describe('Signature Input', () => {
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
    const signaturePad = driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
  });

  eyes.it('should support drawing with specific color', async () => {
    await navigateToStory({ suffix: 'Color' });
    const driver = createDriver();
    const signaturePad = driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
  });

  eyes.it(
    'should fallback to drawing with black for invalid colors',
    async () => {
      await navigateToStory({ suffix: 'ColorInvalid' });
      const driver = createDriver();
      debugger;
      const signaturePad = driver.getChildDriverByHook(TEST_IDS.PAD);
      await signaturePad.click();
    },
  );

  eyes.it('should support clearing', async () => {
    await navigateToStory();
    const driver = createDriver();
    const signaturePad = driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
    const clearButton = driver.getChildDriverByHook(TEST_IDS.CLEAR_BUTTON);
    await clearButton.click();
  });

  eyes.it('should not draw if the signature pad is disabled', async () => {
    await navigateToStory({ suffix: 'Disabled' });
    const driver = createDriver();
    const signaturePad = driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
  });

  eyes.it('should support drawing characters', async () => {
    await navigateToStory();
    const driver = createDriver();
    const a11yInput = driver.getA11yInput();
    await a11yInput.enterValue('a value');
  });

  eyes.it(
    'should support drawing characters when component is with rtl direction',
    async () => {
      await navigateToStory({ suffix: 'Rtl' });
      const driver = createDriver();
      const a11yInput = driver.getA11yInput();
      await a11yInput.enterValue('ערך מימין לשמאל');
    },
  );
});
