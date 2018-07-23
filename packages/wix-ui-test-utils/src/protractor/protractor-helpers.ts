import {
  browser,
  promise,
  ExpectedConditions,
  ElementFinder,
  ElementArrayFinder,
  WebElement
} from 'protractor';

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

export const scrollToElement = (element: ElementFinder) =>
  browser.executeScript((el: HTMLElement) => el.scrollIntoView(), element.getWebElement());

export const hasEllipsis = (element: ElementFinder) => browser.executeScript('return arguments[0].offsetWidth < arguments[0].scrollWidth', element);

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

export function isFocused(element: ElementFinder) {
  return element.equals(browser.driver.switchTo().activeElement());
}

// This interface is copied over from protractor because it isn't exported
export interface ILocation {
  x: number;
  y: number;
}

export const mouseEnter = async (element: WebElement | ILocation) => await browser.actions().mouseMove(element).perform();
export const mouseLeave = () => mouseEnter({x: 1000, y: 1000});
