import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { byDataHook } from '../../../test/utils/unidriver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { DataHooks } from './TagsList.helpers';

import { makeTagUniDriver, TagUniDriver } from './Tag.uni.driver';

export interface TagsListUniDriver extends BaseUniDriver {
  getTagCount(): Promise<number>;
  clickOnTagByIndex(index?: number): Promise<void>;
  getTagByIndex(index?: number): TagUniDriver;
  getTags(): any;
}

export const makeTagsListUniDriver = (base: UniDriver): TagsListUniDriver => {
  const getTags = () => base.$$(`${byDataHook(DataHooks.Tag)}`);

  const getTagByIndex = (index = 0) => {
    const tag = getTags().get(index);
    return makeTagUniDriver(tag);
  };

  return {
    ...baseUniDriverFactory(base),
    getTags,
    getTagCount: () => getTags().count(),
    getTagByIndex,
    clickOnTagByIndex: async (index = 0) => {
      const tagDriver = getTagByIndex(index);

      return tagDriver.simulateClick();
    },
  };
};
