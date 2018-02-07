import {
  browser,
  promise,
  ExpectedConditions,
  ElementFinder,
  ElementArrayFinder
} from 'protractor';

const encode = global.encodeURIComponent;

export const getStoryUrl = (
  kind: string,
  story: string
): string =>
  `iframe.html?selectedKind=${encode(kind)}&selectedStory=${encode(story)}`;

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
