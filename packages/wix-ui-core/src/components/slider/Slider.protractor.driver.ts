import {browser} from 'protractor';
import {waitForVisibilityOf, ILocation} from 'wix-ui-test-utils/protractor';
import {BaseDriver, DriverFactory} from './../../common/BaseDriver.protractor';

export interface SliderDriver extends BaseDriver {
  getSliderValue: () => Promise<string>;
  getTooltipValue: () => Promise<string>;
  clickTrack: (position: ILocation) => Promise<void>;
  dragThumb: (position: ILocation) => Promise<void>;
  dragAndDropThumb: (position: ILocation) => Promise<void>;
}

export const sliderDriverFactory: DriverFactory<SliderDriver> = component => ({
  element: () => component,
  getSliderValue: async () => {
    return component.getAttribute('data-value');
  },
  getTooltipValue: async () => {
    const tooltip = component.$(`[data-hook='tooltip']`);
    await waitForVisibilityOf(tooltip);
    return tooltip.getText();
  },
  clickTrack: async position => {
    const track = component.$(`[data-hook='track']`);
    await browser.driver
      .actions()
      .mouseMove(track, position)
      .click()
      .perform();
  },
  dragThumb: async position => {
    const thumb = component.$(`[data-hook='thumb']`);
    await browser.driver
      .actions()
      .mouseDown(thumb)
      .mouseMove(position)
      .perform();
  },
  dragAndDropThumb: async position => {
    const thumb = component.$(`[data-hook='thumb']`);
    return browser.driver
      .actions()
      .mouseDown(thumb)
      .mouseMove(position)
      .mouseUp()
      .perform();
  }
});
