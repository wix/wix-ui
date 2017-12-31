import * as React from 'react';
import {object, any} from 'prop-types';
import {createHOC} from '../../createHOC';

interface BoxProps {
  children: any;
  classes: {
    boxRoot: string
  };
}

/**
 * Box
 */
class Box extends React.PureComponent<BoxProps> {
  static propTypes = {
    /** any nodes to be rendered */
    children: any,
    /** the class being applied to make it a flex box with flex children */
    classes: object.isRequired
  };

  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.boxRoot}>{children}</div>
    );
  }
}

export default createHOC(Box);
