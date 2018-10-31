import * as React from 'react';
import * as PropTypes from 'prop-types';

import {MenuItem, MenuItemProps} from '../menu-item/menu-item';
import style from './menu.st.css';

type ReactMenuItemElement = React.ReactElement<MenuItemProps>;
type WrappedMenuItemElement = React.ReactElement<MenuItemProps & {className?: string, 'data-hook'?: string}>;

export interface MenuProps {
  /** Menu.Item to be rendered within Menu. Note only Menu.Item is available as children */
  children?: ReactMenuItemElement | ReactMenuItemElement[];

  /** function to be called when some menu item (child element) is clicked */
  onSelect?: (p : MenuItemProps) => void;
}

export class Menu extends React.PureComponent<MenuProps> {
  static displayName = 'Menu';
  
  static Item = MenuItem;

  static propTypes = {
    children: PropTypes.node,
    onSelect: PropTypes.func
  };

  render() {
    const {children, onSelect, ...rest} = this.props;
   
    const filteredChildren = React.Children.toArray(children)
      .filter(
        child => (child as ReactMenuItemElement).type === MenuItem
      )
      .map((child, index) => {
        const {props} = (child as ReactMenuItemElement);
        
        return React.cloneElement(child as WrappedMenuItemElement, {
          className: style.item,
          'data-hook': `menu-item-${index}`,
          onSelect: () => onSelect(props)
        });
      });

      return (
      <div {...style('root', {}, this.props)} {...rest}>
        {filteredChildren}
      </div>
    );
  }
}
