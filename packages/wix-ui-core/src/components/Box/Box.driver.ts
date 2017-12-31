import {DomTestkit} from 'wix-ui-jss/domTestkit';

export const boxDriverFactory = ({element, componentInstance}) => {
  let domTestkit = null;
  if (componentInstance) {
    domTestkit =  new DomTestkit({componentId: componentInstance.id} );
  }

  return {
    /** check if element exists */
    exists: () => !!element,
    /** return box flex direction value */
    getFlexDirection: () => domTestkit.getCssValue({className: 'boxRoot', property: 'flex-direction'}),
    /** return box item alignment value */
    getAlignment: () => domTestkit.getCssValue({className: 'boxRoot', property: 'align-items'})
  };
};
