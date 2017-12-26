import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const sliderDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit = new DomTestkit({componentId: componentInstance.id});
  }

  return {
    /** checks if element exists */
    exists: () => !!element,
    value: () => element.getAttribute('value'),
    min: () => element.getAttribute('min'),
    max: () => element.getAttribute('max'),
    change: () => eventTrigger.change(element),
    /** triggers slider change */
    styles: {
      /** returns elements display css property */
      getRootDisplay: () => {
        return domTestkit.getCssValue({
          className: 'root',
          property: 'display'
        });
      }
    }
  };
};
