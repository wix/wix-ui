import {browser} from 'protractor';
import {mouseEnter, mouseLeave} from 'wix-ui-test-utils/protractor';

export const popoverDriverFactory = component => {
  const getTargetElement = () => component.$('[data-hook="popover-element"]');
  const getContentElement = () => component.$('[data-hook="popover-content"]');

  return {
    element: () => component,
    getTargetElement: () => getTargetElement(),
    getContentElement: () => getContentElement(),
    isTargetElementExists: () => getTargetElement().isPresent(),
    isContentElementExists: () => getContentElement().isPresent(),
    mouseEnter: () => mouseEnter(component),
    mouseLeave,
    click: () => component.click()
  };
};
