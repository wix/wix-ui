import {$, browser, ElementFinder} from 'protractor';
import {mouseEnter, mouseLeave} from 'wix-ui-test-utils/protractor';
import {BaseDriver, DriverFactory} from '../../common/BaseDriver.protractor';

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
    /** Returns the component element */
    element: () => component,

    /** Returns the target element (`<Popover.Element/>`) */
    getTargetElement: () => getTargetElement(),

    /** Returns the content element (`<Popover.Content/>`) */
    getContentElement: () => getContentElement(),

    /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
    isTargetElementExists: async () => getTargetElement().isPresent(),

    /** Returns `true` whether the target element (`<Popover.Element/>`) exists */
    isContentElementExists: async () => getContentElement().isPresent(),

    /** Trigger `mouseEnter` on the element */
    mouseEnter: () => mouseEnter(component),

    /** Trigger `mouseLeave` on the element */
    mouseLeave,

    /** Click on the element */
    click: async () => component.click()
  };
};
