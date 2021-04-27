import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { byDataHook } from '../../../../test/utils/unidriver';
import { ElementFinder } from 'protractor';
import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
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

  return {
    ...baseUniDriverFactory(base),
    getContent: () =>
      base
        .$$(`${byDataHook(DataHook.ChooseFileButton)} > *`)
        .map((ud) => ud.getNative()),
    getText: () => chooseFileButtonUniDriver.text(),
    getAccept: () => fileInputUniDriver.attr('accept'),
    isRequired: async () => (await fileInputUniDriver.attr('required')) === '',
    isDisabled: async () => (await fileInputUniDriver.attr('disabled')) === '',
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
