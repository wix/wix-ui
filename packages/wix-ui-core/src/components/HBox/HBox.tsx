import * as React from 'react';
import {createHOC} from '../../createHOC';

export interface HBoxProps {
  children: any;
  classes?: {
    hRoot: string
  };
}

class HBox extends React.PureComponent<HBoxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.hRoot}>{children}</div>
    );
  }
}

export default createHOC(HBox);
