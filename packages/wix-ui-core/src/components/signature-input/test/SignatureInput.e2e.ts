import {
  signatureInputTestkitFactory,
  SignatureInputUniDriver,
} from '../../../testkit/protractor';
import {
  waitForVisibilityOf,
  createStoryUrl,
} from 'wix-ui-test-utils/protractor';
import { browser } from 'protractor';
import { COMPONENT_METADATA } from '../constants';
import { DataHooks } from './SignatureInputTestFixture';

describe(COMPONENT_METADATA.displayName, () => {
  const storyUrl = createStoryUrl({
    kind: 'Tests',
    story: COMPONENT_METADATA.displayName,
  });
  let driver: SignatureInputUniDriver;

  beforeEach(async () => {
    await browser.get(storyUrl);
    driver = signatureInputTestkitFactory({
      dataHook: DataHooks.SignatureInput,
    });
  });

  it('Should render correctly', async () => {
    expect(await driver.exists()).toBe(true);
  });

  describe('Canvas', () => {
    it('Should render a clean canvas by default', async () => {
      expect(await driver.isSignatureEmpty()).toBe(true);
    });
  });
});
