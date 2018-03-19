import * as queryString from 'query-string';

const WITH_EXAMPLES_PARAM_NAME = 'withExamples';

/**
 *
 * @param {StoryUrlParams} params withExamples defaults to true
 */
export function createStoryUrl({kind, story, withExamples = true}) {
  return `iframe.html?selectedKind=${encodeURIComponent(kind)}&selectedStory=${encodeURIComponent(story)}${withExamples ? `&${WITH_EXAMPLES_PARAM_NAME}=` : ''}`;
}

/**
 * @param {string} urlSearchPart usually the return of `window.location.search`
 */
export function isStoryUrlWithExamples(urlSearchPart) {
  return queryString.parse(urlSearchPart)[WITH_EXAMPLES_PARAM_NAME] !== undefined;
}

