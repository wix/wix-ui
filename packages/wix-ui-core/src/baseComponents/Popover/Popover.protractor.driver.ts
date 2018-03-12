import {browser} from 'protractor';

export const popoverDriverFactory = component => {
  const getTargetElement = () => component.$('[data-hook="popover-element"]');
  const getContentElement = () => component.$('[data-hook="popover-content"]');
  const hover = async element => await browser.actions().mouseMove(element).perform();

  return {
    element: () => component,
    getTargetElement: () => getTargetElement(),
    getContentElement: () => getContentElement(),
    isTargetElementExists: () => getTargetElement().isPresent(),
    isContentElementExists: () => getContentElement().isPresent(),
    mouseEnter: () => hover(component),
    mouseLeave: () => hover({x: 1000, y: 1000}),
    click: () => component.click()
  };
};
