
export const getStoryUrl = (kind, story) => `iframe.html?selectedKind=${kind}&selectedStory=${story}`;

export const scrollToElement = el => {
  browser.executeScript(el => {
    const offset = el.offsetTop;
    window.scroll(0, offset);
  }, el.getWebElement());
};

export const waitForVisibilityOf = (elements, errorMsg, timeout = 10000) => {
  const arrayOfElements = Array.isArray(elements) ? [...elements] : [elements];

  arrayOfElements.map(elem =>
    browser.wait(protractor.ExpectedConditions.visibilityOf(elem), timeout, errorMsg)
  );

  return protractor.promise.all(arrayOfElements);
};
