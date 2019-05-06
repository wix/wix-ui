import * as wuc from '../src/';
import * as icons from 'wix-ui-icons-common';

/*
 * This object contains all wix-ui-core components including icons
 * It is used mainly for documentation in LiveCodeExample and code section.
 */
export const baseScope = {
  ...wuc,
  ...icons,
};

export enum Category {
  COMPNENTS = 'Components',
}

/**
 * Hold story settings for AutoStory.
 */
export interface StorySettings {
  category: Category;
  storyName: string;
  /** data-hook for the AutoExample */
  dataHook?: string;
}
