import * as React from 'react';
import {createHOC} from '../../createHOC';

interface VBoxProps {
  children: any;
  classes: {
    root: string
  };
}

class VBox extends React.PureComponent<VBoxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.root}>{children}</div>
    );
  }
}

export default createHOC(VBox);
