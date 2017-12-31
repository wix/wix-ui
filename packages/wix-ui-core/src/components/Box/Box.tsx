import * as React from 'react';
import {createHOC} from '../../createHOC';

interface BoxProps {
  children: any;
  classes: {
    boxRoot: string
  };
}

class Box extends React.PureComponent<BoxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.boxRoot}>{children}</div>
    );
  }
}

export default createHOC(Box);
