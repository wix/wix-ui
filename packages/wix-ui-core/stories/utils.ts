export enum Category {
  COMPNENTS = 'Components'
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
