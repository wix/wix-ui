import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { Simulate } from 'react-dom/test-utils';

import { byDataHook } from '../../../test/utils/unidriver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { DataHooks } from './TagsList.helpers';
import { ChangeEvent } from 'react';

export interface TagUniDriver extends BaseUniDriver {
  getText(): Promise<string>;
  simulateClick(): Promise<void>;
  getValue(): Promise<string>;
  getInput(): UniDriver;
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
    simulateClick: async () => {
      const input = getInput();

      await input.click();

      if (base.type === 'react') {
        /**
         * UniDriver manually simulates click event using Simulate from
         * 'react-dom/test-utils', which will create SyntheticEvent.
         * No click on input - no "change" event.
         */

        const el = await input.getNative();

        const eventData = {
          target: {
            value: el.value,
            checked: !el.checked,
          },
        };

        Simulate.change(el, eventData as any);
      }
    },
  };
};
