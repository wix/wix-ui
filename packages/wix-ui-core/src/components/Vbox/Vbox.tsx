import * as React from 'react';
import {createHOC} from '../../createHOC';

interface VboxProps {
  children: any;
  classes: {
    root: string
  };
}

class Vbox extends React.PureComponent<VboxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.root}>{children}</div>
    );
  }
}

export default createHOC(Vbox);
