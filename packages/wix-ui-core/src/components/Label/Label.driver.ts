export const labelDriverFactory = ({element, eventTrigger}) => {
  return {
    /** check if element exists */
    exists: () => !!element,
    /** get the label's text */
    getLabelText: () => element.innerHTML,
    /** get the id of the component */
    getId: () => element.getAttribute('id'),
    /** get the "for" attribute of the component */
    getForAttribute: () => element.getAttribute('for'),
    /** click the label */
    click: () => eventTrigger.click(element),
    arrowDown: () => eventTrigger.keyDown(element, {key: 'ArrowDown'}),
  };
};
