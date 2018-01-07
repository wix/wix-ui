export const sliderDriverFactory = ({element, componentInstance, eventTrigger}) => {
  return {
    /** checks if element exists */
    exists: () => !!element,
    value: () => element.getAttribute('value'),
    min: () => element.getAttribute('min'),
    max: () => element.getAttribute('max'),
    change: () => eventTrigger.change(element),
    /** triggers slider change */
    styles: {
    }
  };
};
