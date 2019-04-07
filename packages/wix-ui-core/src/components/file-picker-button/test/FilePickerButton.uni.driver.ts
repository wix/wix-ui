import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { byDataHook, ReactBase } from '../../../../test/utils/unidriver';
import { ElementFinder } from 'protractor';
import { Simulate } from 'react-dom/test-utils';
import { StylableUnidriverUtil } from 'wix-ui-test-utils/unidriver';
import style from '../FilePickerButton.st.css';
import { DataHook } from './FilePickerButton.helpers';

export interface FilePickerButtonUniDriver extends BaseUniDriver {
  getContent(): Promise<any[]>;
  getText(): Promise<string>;
  getAccept(): Promise<string>;
  isRequired(): Promise<boolean>;
  isDisabled(): Promise<boolean>;
  selectFile(file: Partial<File>): Promise<void>;
}

export const filePickerButtonUniDriverFactory = (
  base: UniDriver,
): FilePickerButtonUniDriver => {
  const fileInputUniDriver = base.$(byDataHook(DataHook.FileInput));
  const chooseFileButtonUniDriver = base.$(
    byDataHook(DataHook.ChooseFileButton),
  );
  const stylableUniDriverUtil = new StylableUnidriverUtil(style);
  const getReactFileInputUniDriver = () => ReactBase(fileInputUniDriver);

  return {
    ...baseUniDriverFactory(base),
    getContent: () =>
      base
        .$$(`${byDataHook(DataHook.ChooseFileButton)} > *`)
        .map(ud => ud.getNative()),
    getText: () => chooseFileButtonUniDriver.text(),
    getAccept: () => fileInputUniDriver.attr('accept'),
    isRequired: async () =>
      (await getReactFileInputUniDriver().hasAttribute('required')) &&
      stylableUniDriverUtil.hasStyleState(base, 'required'),
    isDisabled: async () =>
      (await getReactFileInputUniDriver().hasAttribute('disabled')) &&
      stylableUniDriverUtil.hasStyleState(base, 'disabled'),
    selectFile: async (file: Partial<File>) => {
      if (base.type === 'protractor') {
        await ((await fileInputUniDriver.getNative()) as ElementFinder).sendKeys(
          file.name,
        );
      } else if (base.type === 'react') {
        const el: HTMLInputElement = await fileInputUniDriver.getNative();
        Object.defineProperty(el, 'files', {
          value: [file],
        });
        Simulate.change(el, { target: { files: [file] } } as any);
      }
    },
  };
};
