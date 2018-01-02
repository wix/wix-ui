import * as React from 'react';
import {object, any, string, bool} from 'prop-types';
import * as classnames from 'classnames';
import {createHOC} from '../../createHOC';

export type BoxSpacing = string;
export type BoxVertical = boolean;
export type BoxCrossAxisAlignment = 'start' | 'center' | 'end';

export interface BoxProps {
  vertical: BoxVertical;
  children: any;
  classes: {
    boxRoot: string,
    vertical: string,
    horizontal: string
  };
}

/**
 * Box
 */
class Box extends React.PureComponent<BoxProps> {
  static propTypes = {
    /** vertical variant using flex-direction column rather than row */
    vertical: bool,
    /** any nodes to be rendered */
    children: any,
    /** the class being applied to make it a flex box with flex children */
    classes: object.isRequired
  };

  render() {
    const {children, classes, vertical} = this.props;
    const classNames = classnames(classes.boxRoot, {[classes.vertical]: vertical}, {[classes.horizontal]: !vertical});
    return (
      <div className={classNames}>{children}</div>
    );
  }
}

export default createHOC(Box);
