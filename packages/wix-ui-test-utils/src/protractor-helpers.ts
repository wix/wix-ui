import {browser, promise, ExpectedConditions} from 'protractor';

export const getStoryUrl = (kind, story) => `iframe.html?selectedKind=${kind}&selectedStory=${story}`;

export const scrollToElement = element => {
  browser.executeScript(el => {
    const offset = el.offsetTop;
    window.scroll(0, offset);
  }, element.getWebElement());
};

export const waitForVisibilityOf = (elements, errorMsg, timeout = 10000) => {
  const arrayOfElements = Array.isArray(elements) ? [...elements] : [elements];

  arrayOfElements.map(elem =>
    browser.wait(ExpectedConditions.visibilityOf(elem), timeout, errorMsg)
  );

  return promise.all(arrayOfElements);
};
