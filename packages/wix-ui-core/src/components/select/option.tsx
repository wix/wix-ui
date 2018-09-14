import * as React from 'react';

import style from './option.st.css';

export interface Props {
  children: React.ReactNode;
  value: any;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  selected?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
}

export class Option extends React.PureComponent<OptionProps> {
  render() {
    const {selected, highlighted, disabled} = this.props;
    return <div {...style('root', {selected, highlighted, disabled})} {...this.props} />;
  }
}
