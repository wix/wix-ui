import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { byDataHook } from '../../../test/utils/unidriver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { DataHooks } from './TagsList.helpers';

import { makeTagUniDriver } from './Tag.uni.driver';

export interface TagsListUniDriver extends BaseUniDriver {
  getTagCount(): Promise<number>;
  clickOnTagByIndex(): Promise<void>;
}

export const makeTagsListUniDriver = (base: UniDriver): TagsListUniDriver => {
  const getTags = () => base.$$(`${byDataHook(DataHooks.Tag)}`);

  const getTag = (index = 0) => {
    const tag = getTags().get(index);
    return makeTagUniDriver(tag);
  };

  return {
    ...baseUniDriverFactory(base),
    getTagCount: () => getTags().count(),
    clickOnTagByIndex: async (index = 0) => {
      const tagDriver = getTag(index);

      return tagDriver.simulateClick();
    },
  };
};
