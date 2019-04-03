import { UniDriver } from 'unidriver';
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
}

export const filePickerButtonPrivateUniDriverFactory = (
  base: UniDriver,
): FilePickerButtonPrivateUniDriver => {
  const fileInputUniDriver = base.$(byDataHook(DataHook.FileInput));
  const chooseFileButtonUniDriver = base.$(
    byDataHook(DataHook.ChooseFileButton),
  );
  const reactChooseFileButtonUniDriver = ReactBase(chooseFileButtonUniDriver);

  return {
    ...filePickerButtonUniDriverFactory(base),
    focusChooseFileButton: async () => reactChooseFileButtonUniDriver.focus(),
    getNativeInput: async () => {
      if (base.type === 'react') {
        const el: HTMLInputElement = await fileInputUniDriver.getNative();
        return el;
      }
    },
  };
};
