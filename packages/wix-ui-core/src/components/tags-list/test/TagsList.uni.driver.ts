import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { byDataHook } from '../../../../test/utils/unidriver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { DataHook } from '../TagsList.helpers';

export interface TagsListUniDriver extends BaseUniDriver {
  getContent(): Promise<any[]>;
  clickOnTagInput(): Promise<void>;
  getIsChecked(): Promise<string>;
}

export const tagsListUniDriver = (base: UniDriver): TagsListUniDriver => {
  const getInput = index =>
    base
      .$$(`${byDataHook(DataHook.TagInput)}`)
      .get(index)
      .getNative();

  return {
    ...baseUniDriverFactory(base),
    getContent: () =>
      base.$$(`${byDataHook(DataHook.Tag)}`).map(ud => ud.getNative()),
    clickOnTagInput: async (index = 0) => {
      const native = await getInput(index);

      return native.click();
    },
    getIsChecked: async (index = 0) => {
      const native = await getInput(index);

      return native.checked;
    },
  };
};
