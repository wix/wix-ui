import * as React from 'react';
import {createHOC} from '../../createHOC';

interface HBoxProps {
  children: any;
  classes: {
    root: string
  };
}

class HBox extends React.PureComponent<HBoxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.root}>{children}</div>
    );
  }
}

export default createHOC(HBox);
