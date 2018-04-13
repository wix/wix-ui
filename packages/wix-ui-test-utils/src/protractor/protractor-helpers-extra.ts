import {ILocation} from './protractor-types';

import {
  browser,
  promise,
  ExpectedConditions,
  ElementFinder,
  WebElement
} from 'protractor';

export const scrollToElement = (element: ElementFinder) =>
  browser.executeScript((el: HTMLElement) => el.scrollIntoView(), element.getWebElement());

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

export const mouseEnter = async (element: WebElement | ILocation) => await browser.actions().mouseMove(element).perform();
export const mouseLeave = () => mouseEnter({x: 1000, y: 1000});
