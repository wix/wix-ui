import {DomTestkit} from 'wix-ui-jss/domTestkit';

const getClasses = (element) => {
  const rawCssClasses = element.getAttribute('class');
  let cssClasses = [];
  if (rawCssClasses !== null) {
    cssClasses = element.getAttribute('class').split(' ');
  }
  return cssClasses;
};

export const textDriverFactory = ({element, componentInstance}) => {
  let domTestkit = null;
  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id} );
  }

  return {
    /** check if element exists */
    exists: () => !!element,
    /** check if component has ellipsis */
    isEllipsis: className => getClasses(element).indexOf('ellipsis') !== -1,
    /** check if element has title attribute */
    hasTitleAttribute: () => element.getAttribute('title') !== null,
    /** return text font-family value */
    getFontFamily: () => domTestkit.getCssValue({className: 'root', property: 'font-family'})
  };
};
