import * as React from 'react';
import * as PropTypes from 'prop-types';
import style from './menu-item.st.css';

export interface Props {
  /** any node to be rendered inside MenuItem */
  children?: React.ReactNode;

  /** callback which will be called uppon item selection */
  onSelect?: () => void;

  /** define if MenuItem is in selected state */
  selected?: boolean;

  /** define if MenuItem is in highlighted state */
  highlighted?: boolean;

  /** define if MenuItem is in disabled state */
  disabled?: boolean;
}

export class MenuItem extends React.PureComponent<Props> {
  static displayName = 'MenuItem';

  static propTypes = {
    children: PropTypes.node,
    onSelect: PropTypes.func,
    selected: PropTypes.bool,
    highlighted: PropTypes.bool,
    disabled: PropTypes.bool
  };

  render() {
    const {selected, highlighted, disabled, onSelect, ...rest} = this.props;
    return (
      <div
        {...style('root', {selected, highlighted, disabled}, this.props)}
        {...rest}
        onClick={disabled ? () => null : onSelect}
      />
    );
  }
}
