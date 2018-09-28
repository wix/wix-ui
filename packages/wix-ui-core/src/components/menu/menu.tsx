import * as React from 'react';
import * as PropTypes from 'prop-types';

import {MenuItem, Props as MenuItemProps} from '../menu-item/menu-item';
import style from './menu.st.css';

export interface Props {
  /** Menu.Item to be rendered within Menu. Note only Menu.Item is available as children */
  children?: React.ReactElement<MenuItem> | React.ReactElement<MenuItem>[];

  /** function to be called when some menu item (child element) is clicked */
  onChange?: Function;
}

export class Menu extends React.PureComponent<Props> {
  static displayName = 'Menu';
  static Item = MenuItem;

  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func
  };

  render() {
    const {children, onChange, ...rest} = this.props;
    const filteredChildren = React.Children.toArray(children)
      .filter(
        child => (child as React.ReactElement<MenuItemProps>).type === MenuItem
      )
      .map((child, index) => {
        const props = (child as React.ReactElement<MenuItemProps>).props;
        const {selected, highlighted, disabled} = props;
        return React.cloneElement(child as React.ReactElement<any>, {
          ...style('item', {selected, highlighted, disabled}, props),
          'data-hook': `menu-item-${index}`,
          onClick: () => onChange(props)
        });
      });

    return (
      <div {...style('root', {}, this.props)} {...rest}>
        {filteredChildren}
      </div>
    );
  }
}
