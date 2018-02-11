import * as React from 'react';
import {createHOC} from '../../createHOC';

export interface HBoxProps {
  children: any;
  classes?: {
    hRoot: string
  };
}

const HBox: React.SFC<HBoxProps> = ({children, classes}) => (
  <div className={classes.hRoot}>{children}</div>
);

export default createHOC(HBox);
