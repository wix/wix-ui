import * as React from 'react';
import {object, any, bool} from 'prop-types';
import * as classnames from 'classnames';
import {createHOC} from '../../createHOC';

export interface BoxProps {
  vertical?: boolean;
  lastItemTakesRemainingWidth?: boolean;
  children: any;
  classes?: {
    boxRoot: string,
    vertical: string,
    horizontal: string,
    lastItemTakesRemainingWidth: string
  };
}

/**
 * Box
 */
const Box: React.SFC<BoxProps> = ({children, classes, vertical, lastItemTakesRemainingWidth}) => {
  const classNames = classnames(classes.boxRoot, {
    [classes.vertical]: vertical,
    [classes.horizontal]: !vertical,
    [classes.lastItemTakesRemainingWidth]: lastItemTakesRemainingWidth
  });

  return (
    <div className={classNames}>{children}</div>
  );
};

Box.propTypes = {
  /** vertical variant using flex-direction column rather than row */
  vertical: bool,
  /** Last Item Takes Remaining Width boolean is useful for setting an input field to full width */
  lastItemTakesRemainingWidth: bool,
  /** any nodes to be rendered */
  children: any,
  /** the class being applied to make it a flex box with flex children */
  classes: object.isRequired
};

export default createHOC(Box);
