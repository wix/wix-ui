const encode = global.encodeURIComponent;

export interface StoryUrlParams {
  kind: string;
  story: string;
  withExamples?: boolean;
}

/**
 * @deprecated
 * @see createStoryUrl
 */
export const getStoryUrl = (kind: string, story: string): string =>
  createStoryUrl({kind, story});

/**
 *
 * @param {StoryUrlParams} params withExamples defaults to true
 */
export const createStoryUrl = ({kind, story, withExamples = true}: StoryUrlParams): string => {
  return `iframe.html?selectedKind=${encode(kind)}&selectedStory=${encode(story)}${withExamples ? `&withExamples` : ''}`;
};
