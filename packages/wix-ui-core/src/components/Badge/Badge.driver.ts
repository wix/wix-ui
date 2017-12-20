import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const badgeDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  return {
    /** exists method - checks if element exists */
    exists: () => !!element,
    /** getType method - returns elements type */
    getType: () => element.getAttribute('type'),
    /** getType method - returns elements innerHTML */
    getContent: () => element.innerHTML,
    /** getHeight method - returns elements height css property*/
    getHeight: () => domTestkit.getCssValue({className: 'badge', property: 'height'}),
    /** getPadding method - returns elements padding css property*/
    getPadding: () => domTestkit.getCssValue({className: 'badge', property: 'padding'}),
    /** getColor method - returns elements color css property*/
    getColor: () => domTestkit.getCssValue({className: 'badge', property: 'color'}),
    /** getOpacity method - returns elements opacity css property*/
    getOpacity: () => domTestkit.getCssValue({className: 'badge', property: 'opacity'}),
    /** getBorderRadius method - returns elements border-radius css property*/
    getBorderRadius: () => domTestkit.getCssValue({className: 'badge', property: 'border-radius'}),
    /** getFontSize method - returns elements font-size css property*/
    getFontSize: () => domTestkit.getCssValue({className: 'badge', property: 'font-size'}),
    /** getLineHeight method - returns elements line-height css property*/
    getLineHeight: () => domTestkit.getCssValue({className: 'badge', property: 'line-height'}),
    /** getTextDecoration method - returns elements text-decoration css property*/
    getTextDecoration: () => domTestkit.getCssValue({className: 'badge', property: 'text-decoration'}),
    /** getCursor method - returns elements cursor css property*/
    getCursor: () => domTestkit.getCssValue({className: 'badge', property: 'cursor'})
  };
};
