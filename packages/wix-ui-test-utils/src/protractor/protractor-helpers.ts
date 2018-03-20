import {
  browser,
  promise,
  ExpectedConditions,
  ElementFinder,
  ElementArrayFinder,
  WebElement
} from 'protractor';
import {createStoryUrl} from 'wix-storybook-utils';
const encode = global.encodeURIComponent;

/**
 * @deprecated
 * @see createStoryUrl
 */
export const getStoryUrl = (kind: string, story: string): string =>
  createStoryUrl({kind, story});

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
