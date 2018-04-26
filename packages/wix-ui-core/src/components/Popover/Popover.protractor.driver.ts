import {BaseDriver, DriverFactory} from '../../common/BaseDriver.protractor';
import {$, browser, ElementFinder} from 'protractor';
import {mouseEnter, mouseLeave} from 'wix-ui-test-utils/protractor';

export interface PopoverDriver extends BaseDriver {
  getTargetElement: () => ElementFinder;
  getContentElement: () => ElementFinder;
  isTargetElementExists: () => Promise<boolean>;
  isContentElementExists: () => Promise<boolean>;
  mouseEnter: () => Promise<void>;
  mouseLeave: () => Promise<void>;
  click: () => Promise<void>;
}

export const popoverDriverFactory: DriverFactory<PopoverDriver> = component => {
  const getTargetElement = () => $('[data-hook="popover-element"]');
  const getContentElement = () => $('[data-hook="popover-content"]');

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
