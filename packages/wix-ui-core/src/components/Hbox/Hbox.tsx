import * as React from 'react';
import {createHOC} from '../../createHOC';

interface HboxProps {
  children: any;
  classes: {
    root: string
  };
}

class Hbox extends React.PureComponent<HboxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.root}>{children}</div>
    );
  }
}

export default createHOC(Hbox);
