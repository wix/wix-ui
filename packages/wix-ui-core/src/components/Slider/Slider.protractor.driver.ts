import {browser} from 'protractor';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';

export const sliderDriverFactory = component => ({
  element: () => component,
  getSliderValue: () => {
    return component.getAttribute('data-value');
  },
  getTooltipValue: async () => {
    const tooltip = component.$(`[data-hook='tooltip']`);
    await waitForVisibilityOf(tooltip);
    return tooltip.getText();
  },
  clickTrack: async (position) => {
    const track = component.$(`[data-hook='track']`);
    browser.driver
      .actions()
      .mouseMove(track, position)
      .click()
      .perform();
  },
  dragThumb: async (position) => {
    const thumb = component.$(`[data-hook='thumb']`);
    browser.driver
      .actions()
      .mouseDown(thumb)
      .mouseMove(position)
      .perform();
  },
  dragAndDropThumb: async (position) => {
    const thumb = component.$(`[data-hook='thumb']`);
    return browser.driver
      .actions()
      .mouseDown(thumb)
      .mouseMove(position)
      .mouseUp()
      .perform();
  }
});
