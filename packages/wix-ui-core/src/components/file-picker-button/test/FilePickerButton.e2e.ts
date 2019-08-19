import {
  createStoryUrl,
  getElementByDataHook,
} from 'wix-ui-test-utils/protractor';
import { browser } from 'protractor';
import {
  FilePickerButtonUniDriver,
  filePickerButtonTestkitFactory,
} from '../../../testkit/protractor';
import { DataHook } from './FilePickerButtonTestFixture';
import * as path from 'path';
import {Category} from '../../../../stories/utils';

describe('FilePickerButton', () => {
  const storyUrl = createStoryUrl({
    kind: Category.TESTS,
    story: 'FilePickerButton',
  });

  let driver: FilePickerButtonUniDriver;

  beforeEach(async () => {
    await browser.get(storyUrl);
    driver = filePickerButtonTestkitFactory({
      dataHook: DataHook.FilePickerButton,
    });
  });

  it('should render the selected file names', async () => {
    const absoluteFilePath = __filename;
    const fileName = path.basename(absoluteFilePath);
    await driver.selectFile({ name: absoluteFilePath });
    const fileNamesEl = getElementByDataHook(DataHook.FileNames);
    expect(await fileNamesEl.getText()).toBe(fileName);
  });

  it('should trigger onChange when selecting the same file after reset (reset also triggers onChange)', async () => {
    const getOnChangeCountText = () =>
      getElementByDataHook(DataHook.OnChangeCount).getText();
    expect(await getOnChangeCountText()).toBe('0');

    await driver.selectFile({ name: __filename });
    expect(await getOnChangeCountText()).toBe('1');

    const resetButtonEl = getElementByDataHook(DataHook.ResetButton);
    await resetButtonEl.click();
    expect(await getOnChangeCountText()).toBe('2');

    await driver.selectFile({ name: __filename });
    expect(await getOnChangeCountText()).toBe('3');
  });
});
