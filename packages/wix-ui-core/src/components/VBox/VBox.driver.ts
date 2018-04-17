export const vBoxDriverFactory = ({element}) => {

  return {
    /** check if element exists */
    exists: () => !!element,
    /** get the rendered content */
    getChildren: () => element.innerHTML
  };
};
