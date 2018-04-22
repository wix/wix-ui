import {browser, ElementFinder} from 'protractor';
import {mouseEnter, mouseLeave} from 'wix-ui-test-utils/protractor';

export const popoverDriverFactory = (component: ElementFinder) => {
  const getTargetElement = () => component.$('[data-hook="popover-element"]');
  const getContentElement = () => component.$('[data-hook="popover-content"]');

  return {
    element: () => component,
    getTargetElement: () => getTargetElement(),
    getContentElement: () => getContentElement(),
    isTargetElementExists: async () => getTargetElement().isPresent(),
    isContentElementExists: async () => getContentElement().isPresent(),
    mouseEnter: () => mouseEnter(component),
    mouseLeave,
    click: async () => component.click()
  };
};
