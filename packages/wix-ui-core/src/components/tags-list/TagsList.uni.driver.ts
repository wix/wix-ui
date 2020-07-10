import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { byDataHook } from '../../../test/utils/unidriver';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { DataHooks, DataAttributes } from './TagsList.helpers';
import { KeyDefinitionType } from '@unidriver/core';

import { makeTagUniDriver, TagUniDriver } from './Tag.uni.driver';

export interface TagsListUniDriver extends BaseUniDriver {
  getTagCount(): Promise<number>;
  clickOnTagByIndex(index?: number): Promise<void>;
  getTagByIndex(index?: number): TagUniDriver;
  getTags(): any;
  focusTag(index: number): Promise<TagUniDriver>;
  focusNextTag(): Promise<void>;
}

export const makeTagsListUniDriver = (base: UniDriver): TagsListUniDriver => {
  const getTags = () => base.$$(`${byDataHook(DataHooks.Tag)}`);

  const getTagByIndex = (index = 0) => {
    const tag = getTags().get(index);
    return makeTagUniDriver(tag);
  };

  const isSingleSelection = async () => {
    return ((await base.attr(`data-${DataAttributes.SingleSelection}`)) === 'true');
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
    focusTag: async (index: number) => {
      const tag = getTagByIndex(index);
      await tag.focus();
      return tag;
    },
    focusNextTag: async () => {
      const singleSelection = await isSingleSelection();
      let key = 'Tab';

      if (singleSelection) {
        key = 'ArrowRight';
      }

      await base.pressKey(key as KeyDefinitionType);
    }
  };
};
