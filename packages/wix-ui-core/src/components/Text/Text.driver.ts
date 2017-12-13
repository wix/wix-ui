import {DomTestDriver} from './../../DOMStyleRenderer/domTest.driver';

const getClasses = (element) => {
  const rawCssClasses = element.getAttribute('class');
  let cssClasses = [];
  if (rawCssClasses !== null) {
    cssClasses = element.getAttribute('class').split(' ');
  }
  return cssClasses;
};

export const textDriverFactory = ({element, componentInstance}) => {
  let domTestDriver = null;
  if (componentInstance) {
    domTestDriver =  new DomTestDriver({componentId: componentInstance.id} );
  }

  return {
    exists: () => !!element,
    isEllipsis: className => getClasses(element).indexOf('ellipsis') !== -1,
    hasTitleAttribute: () => element.getAttribute('title') !== null,
    getFontFamily: () =>  domTestDriver.getCssValue({className: 'root', property: 'font-family'})
  };
};
