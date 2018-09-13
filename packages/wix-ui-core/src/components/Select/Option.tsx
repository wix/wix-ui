import * as React from 'react';

import style from './Option.st.css';

export interface OptionProps {
  children: React.ReactNode;
  value: any;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  selected?: boolean;
  disabled?: boolean;
}

export class Option extends React.PureComponent<OptionProps> {
  render() {
    const {selected, disabled} = this.props;
    return <div {...style('root', {selected, disabled})} {...this.props} />;
  }
}
