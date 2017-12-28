import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const badgeDriverFactory = ({element, componentInstance, eventTrigger}) => {
  let domTestkit = null;

  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id});
  }

  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns elements type attribute */
    getType: () => element.getAttribute('type'),
    /** returns elements innerHtml */
    getContent: () => element.innerHTML,
    /** styles element for css properties */
    styles: {
      /** returns elements height css property */
      getHeight: () => domTestkit.getCssValue({className: 'badge', property: 'height'}),
      /** returns elements padding css property */
      getPadding: () => domTestkit.getCssValue({className: 'badge', property: 'padding'}),
      /** returns elements color css property */
      getColor: () => domTestkit.getCssValue({className: 'badge', property: 'color'}),
      /** returns elements opacity css property */
      getOpacity: () => domTestkit.getCssValue({className: 'badge', property: 'opacity'}),
      /** returns elements border-radius css property */
      getBorderRadius: () => domTestkit.getCssValue({className: 'badge', property: 'border-radius'}),
      /** returns elements font-size css property */
      getFontSize: () => domTestkit.getCssValue({className: 'badge', property: 'font-size'}),
      /** returns elements line-height css property */
      getLineHeight: () => domTestkit.getCssValue({className: 'badge', property: 'line-height'}),
      /** returns elements text-decoration css property */
      getTextDecoration: () => domTestkit.getCssValue({className: 'badge', property: 'text-decoration'}),
      /** returns elements cursor css property */
      getCursor: () => domTestkit.getCssValue({className: 'badge', property: 'cursor'})
    }
  };
};
