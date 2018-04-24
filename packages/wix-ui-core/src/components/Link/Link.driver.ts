export const linkDriverFactory = ({element, eventTrigger}) => {
  const getAttribute = attribute => element.attributes[attribute];

  return {
    exists: () => !!element,
    isAnchor: () => element.tagName === 'A',
    getAttribute,

    getSrc: () => {
      const href = getAttribute('href');
      return href && href.value;
    },

    getChildren: () => element.innerHTML,
    trigger: (eventName, event = {}) => eventTrigger[eventName](element, event)
  };
};
