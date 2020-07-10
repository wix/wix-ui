import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';

import { byDataHook } from '../../../test/utils/unidriver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { DataHooks } from './TagsList.helpers';
import { KeyDefinitionType } from '@unidriver/core';

export interface TagUniDriver extends BaseUniDriver {
  getText(): Promise<string>;
  simulateClick(): Promise<void>;
  getValue(): Promise<string>;
  getInput(): UniDriver;
  isChecked(): Promise<boolean>;
  focus(): Promise<void>;
  simulatePressSpace(): Promise<void>;
}

export const makeTagUniDriver = (base: UniDriver): TagUniDriver => {
  const getInput = () => base.$(`${byDataHook(DataHooks.TagInput)}`);
  const inputElement = getInput();

  return {
    ...baseUniDriverFactory(base),
    getInput,
    getText: () => base.text(),
    getValue: async () => {
      return inputElement.value();
    },
    isChecked: async () => {
      const element = await baseUniDriverFactory(inputElement).element();

      return element.checked;
    },
    simulateClick: async () => {
      return inputElement.click();
    },
    focus: async () => {
      (await base.getNative()).focus();
    },
    simulatePressSpace: async () => {
      await base.pressKey('Space' as KeyDefinitionType);
    }
  };
};
