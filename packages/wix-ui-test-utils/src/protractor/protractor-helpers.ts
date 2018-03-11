import {
  browser,
  promise,
  ExpectedConditions,
  ElementFinder,
  ElementArrayFinder
} from 'protractor';

const encode = global.encodeURIComponent;

// TODO: import from `wix-storybook-utils` or move getStoryUrl() to
// `wix-storybook-utils` and import/export it here.
const  WITH_EXAMPLES_PARAM_NAME = 'withExamples';

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
export const createStoryUrl = (params: StoryUrlParams): string => {
  const {kind, story, withExamples = true} = params;
  return `iframe.html?selectedKind=${encode(kind)}&selectedStory=${encode(story)}${withExamples ? `&${WITH_EXAMPLES_PARAM_NAME}=` : ''}`;
};

export const scrollToElement = (element: ElementArrayFinder) =>
  browser.executeScript(
    (el: HTMLElement)  => {
      const offset = el.offsetTop;
      window.scroll(0, offset);
    },
    element.getWebElement()
  );

export const waitForVisibilityOf = (
  elements: Array<ElementFinder> | ElementFinder,
  errorMsg?: string, timeout = 10000
) => {
  const arrayOfElements =
    Array.isArray(elements)
      ? [...elements]
      : [elements];

  return promise.all(
    arrayOfElements.map(elem =>
      browser.wait(
        ExpectedConditions.visibilityOf(elem),
        timeout,
        errorMsg
      )
    )
  );
};
