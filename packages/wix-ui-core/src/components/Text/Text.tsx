import * as React from 'react'; 
import * as classnames from 'classnames';
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
    ellipsis: string;
  };
  
  interface TextProps {
    classes: TextClasses;
    children: PropTypes.any;
    ellipsis: PropTypes.bool,
    forceHideTitle: PropTypes.bool
  }
  
  class Text extends  React.PureComponent<TextProps> {
  static displayName = 'Text'

  constructor(props) {
    super(props);
  }

  getTitle = () => {
    const {forceHideTitle, ellipsis, children} = this.props;
    let title = null;
    if(typeof children === 'string' && ellipsis && !forceHideTitle){
      title = children;
    }
    return title
  }

  render() {
    const { classes, children, ellipsis} = this.props;    
    const cssClasses = {
      [classes.root]: true,
      [classes.ellipsis] : ellipsis
    }

    return (<span className={classnames(cssClasses)} title={this.getTitle()}>
      {children}
    </span>)
  }
}


export default createHOC(Text);
