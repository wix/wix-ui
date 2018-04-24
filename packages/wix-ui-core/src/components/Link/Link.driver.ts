export const linkDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  isAnchor: () => element.tagName === 'A',
  getAttribute: attribute => {
    const attr = element.attributes[attribute];
    return attr ? attr.value : undefined;
  },
  getChildren: () => element.innerHTML,
  trigger: (eventName, event = {}) => eventTrigger[eventName](element, event)
});
