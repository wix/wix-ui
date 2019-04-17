import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  FilePickerButtonUniDriver,
  filePickerButtonUniDriverFactory,
} from './FilePickerButton.uni.driver';
import { byDataHook, ReactBase } from '../../../../test/utils/unidriver';
import { DataHook } from './FilePickerButton.helpers';

export interface FilePickerButtonPrivateUniDriver
  extends FilePickerButtonUniDriver {
  focusChooseFileButton(): Promise<void>;
  getNativeInput(): Promise<HTMLInputElement>;
  getFileInputAttribute(attr: string): Promise<string>;
  getChooseFileButtonAttribute(attr: string): Promise<string>;
}

export const filePickerButtonPrivateUniDriverFactory = (
  base: UniDriver,
): FilePickerButtonPrivateUniDriver => {
  const fileInputUniDriver = base.$(byDataHook(DataHook.FileInput));
  const chooseFileButtonUniDriver = base.$(
    byDataHook(DataHook.ChooseFileButton),
  );

  const reactFileInputUniDriver = ReactBase(fileInputUniDriver);
  const reactChooseFileButtonUniDriver = ReactBase(chooseFileButtonUniDriver);

  return {
    ...filePickerButtonUniDriverFactory(base),
    focusChooseFileButton: () => reactChooseFileButtonUniDriver.focus(),
    getNativeInput: async () => {
      if (base.type === 'react') {
        const el: HTMLInputElement = await fileInputUniDriver.getNative();
        return el;
      }
    },
    getFileInputAttribute: (attr: string) =>
      reactFileInputUniDriver.getAttribute(attr),
    getChooseFileButtonAttribute: (attr: string) =>
      reactChooseFileButtonUniDriver.getAttribute(attr),
  };
};
