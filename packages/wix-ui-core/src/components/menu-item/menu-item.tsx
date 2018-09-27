import * as React from 'react';
import * as PropTypes from 'prop-types';

import style from './menu-item.st.css';

export interface Props {
  /** any node to be rendered inside Menu.Item */
  children?: React.ReactNode;

  /** mouse click callback */
  onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;

  /** define if MenuItem is in selected state */
  selected?: boolean;

  /** define if MenuItem is in highlighted state */
  highlighted?: boolean;

  /** define if MenuItem is in disabled state */
  disabled?: boolean;
}

export class MenuItem extends React.PureComponent<Props> {
  static displayName = 'Menu.Item';

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    highlighted: PropTypes.bool,
    disabled: PropTypes.bool
  };

  render() {
    const {selected, highlighted, disabled, ...rest} = this.props;
    return (
      <div
        {...style('root', {selected, highlighted, disabled}, this.props)}
        {...rest}
      />
    );
  }
}
