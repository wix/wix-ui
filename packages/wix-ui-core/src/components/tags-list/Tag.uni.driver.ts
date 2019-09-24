import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';

import { byDataHook } from '../../../test/utils/unidriver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { DataHooks } from './TagsList.helpers';

export interface TagUniDriver extends BaseUniDriver {
  getText(): Promise<string>;
  simulateClick(): Promise<void>;
  getValue(): Promise<string>;
  getInput(): UniDriver;
  isChecked(): Promise<boolean>;
}

export const makeTagUniDriver = (base: UniDriver): TagUniDriver => {
  const getInput = () => base.$(`${byDataHook(DataHooks.TagInput)}`);

  return {
    ...baseUniDriverFactory(base),
    getInput,
    getText: () => base.text(),
    getValue: async () => {
      const native = getInput();

      return native.value();
    },
    isChecked: async () => {
      const element = await baseUniDriverFactory(getInput()).element();

      return element.checked;
    },
    simulateClick: async () => {
      const input = getInput();

      return input.click();
    },
  };
};
