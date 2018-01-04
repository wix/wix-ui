import * as React from 'react';
import {createHOC} from '../../createHOC';

export interface VBoxProps {
  children: any;
  classes?: {
    vRoot: string
  };
}

class VBox extends React.PureComponent<VBoxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.vRoot}>{children}</div>
    );
  }
}

export default createHOC(VBox);
