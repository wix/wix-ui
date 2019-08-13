import { signatureInputTestkitFactory } from '../../../testkit/protractor';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';
import { browser } from 'protractor';
import { SIGNNATURE_INPUT_METADATA } from '../constants';
import { TEST_IDS } from './SignatureInputTestFixture';
import { Category } from '../../../../stories/utils';

const createDriver = () =>
  signatureInputTestkitFactory({ dataHook: TEST_IDS.ROOT });

const isCanvasBlank = async (canvasDataHook: string) => {
  const canvasData = await getCanvasData(canvasDataHook);
  return canvasData.every(isWhite);
};

const getCanvasData = (canvasDataHook: string) => {
  return browser.executeScript<Uint32Array>(hook => {
    const canvas = document.querySelector(
      `[data-hook="${hook}"]`,
    ) as HTMLCanvasElement;
    const canvasData = canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data.buffer;
    return new Uint32Array(canvasData);
  }, canvasDataHook);
};

const isWhite = (color: number) => color === 0;

const storyUrl = createStoryUrl({
  kind: Category.TESTS,
  story: SIGNNATURE_INPUT_METADATA.displayName,
});

describe('Signature Input', () => {
  beforeEach(async () => {
    await browser.get(storyUrl);
  });

  it('should render correctly', async () => {
    const driver = createDriver();
    expect(await driver.exists()).toBe(true);
  });

  it('should intially be blank', async () => {
    createDriver();
    const isCanvasBlankResult = await isCanvasBlank(TEST_IDS.PAD);
    expect(isCanvasBlankResult).toBe(true);
  });

  it('should support drawing', async () => {
    const driver = createDriver();
    const signaturePad = await driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
    const isCanvasBlankResult = await isCanvasBlank(TEST_IDS.PAD);
    expect(isCanvasBlankResult).toBe(false);
  });

  it('should support clearing', async () => {
    const driver = createDriver();
    const signaturePad = await driver.getChildDriverByHook(TEST_IDS.PAD);
    await signaturePad.click();
    const clearButton = await driver.getChildDriverByHook(
      TEST_IDS.CLEAR_BUTTON,
    );
    await clearButton.click();
    const isCanvasBlankResult = await isCanvasBlank(TEST_IDS.PAD);
    expect(isCanvasBlankResult).toBe(true);
  });
});
