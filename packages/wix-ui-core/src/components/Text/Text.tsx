import * as React from 'react'; 

import PropTypes from 'prop-types'; 
import {createHOC} from '../../createHOC';


// import WixComponent from '../BaseComponents/WixComponent';
// import classNames from 'classnames'; 
// import typography, {convertFromUxLangToCss} from '../Typography';
// import styles from './styles.scss';


/**
  * General all purpose text component with Wix styling.
  *
  * Adds correct styling so you don't have to.
  *
  * Renders correct element (either `span` or `h1` - `h5`) depending on `appearance` (defaults to `span`)
  */

  // interface ToggleSwitchProps {
  //   classes: ToggleSwitchClasses;
  // }
  type TextClasses = {
    root: string;
  };
  
  interface TextProps {
    classes: TextClasses;
    children: PropTypes.any;
    forceHideTitle: PropTypes.bool
  }
  
  class Text extends  React.PureComponent<TextProps> {
  static displayName = 'Text'

  constructor(props) {
    super(props);
  }

  render() {
    const { classes, children} = this.props;    
    
    return (<span className={classes.root}>
      {children}
    </span>)
  }
}


export default createHOC(Text);
