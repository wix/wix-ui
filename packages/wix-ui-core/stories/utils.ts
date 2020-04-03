import * as wuc from '../src/index';
import * as Icons from 'wix-ui-icons-common';

/*
 * This object contains all wix-ui-core components including icons
 * It is used mainly for documentation in LiveCodeExample and code section.
 */
export const baseScope = {
  ...wuc,
  Icons,
};

export enum Category {
  COMPONENTS = 'Components',
  TESTS = 'Tests',
  HOCS = 'HOCs',
  BACKOFFICE = 'Backoffice',
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
