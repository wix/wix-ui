import {mouseEnter} from 'wix-ui-test-utils/protractor';

export const thumbnailDriverFactory = component => ({
  /** returns the component element */
  element: () => component,
  /** triggers a mouseEnter event on the compomnent */
  mouseEnter: () => mouseEnter(component),
  /** triggers a click event on the component */
  click: () => component.click()
});
