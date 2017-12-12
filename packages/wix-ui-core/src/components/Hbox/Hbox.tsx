import * as React from 'react';

interface HboxProps {
  children: any;
  classes: {
    root: string
  };
}

export default class Hbox extends React.PureComponent<HboxProps> {
  render() {
    const {children, classes} = this.props;
    return (
      <div className={classes.root} >{children}</div>
    );
  }
}
