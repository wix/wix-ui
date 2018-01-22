export const badgeDriverFactory = ({element}) => {
  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns elements type attribute */
    getType: () => element.getAttribute('type'),
    /** returns elements innerHtml */
    getContent: () => element.innerHTML,
    /** styles element for css properties */
  };
};
