import {
  browser,
  promise,
  ExpectedConditions,
  ElementFinder,
  ElementArrayFinder,
  WebElement
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
