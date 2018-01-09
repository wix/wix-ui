export const sliderDriverFactory = ({element, componentInstance, eventTrigger}) => {
  const sliderInput = element.querySelector('input');

  return {
    /** checks if element exists */
    exists: () => !!element,
    value: () => sliderInput.getAttribute('value'),
    min: () => sliderInput.getAttribute('min'),
    max: () => sliderInput.getAttribute('max'),
    change: () => eventTrigger.change(sliderInput),
    input: () => eventTrigger.input(sliderInput),
    /** triggers slider change */
    styles: {
    }
  };
};
