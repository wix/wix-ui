import * as React from 'react';
import Downshift from 'downshift';
import Popper from 'popper.js';
const get = require('lodash/get');

import style from './select.st.css';
import {Menu} from './menu';

export interface SelectProps {
  toggle?: Function;
  children: React.ReactNode;
  placement?: Popper.Placement;
  onChange?: React.EventHandler<OnChangeEvent>;
}

export class Select extends React.PureComponent<SelectProps> {
  toggleRef: Element;
  menuRef: Element;
  popper: Popper;

  static defaultProps = {
    toggle: ({getToggleButtonProps}) => (
      <button {...getToggleButtonProps()}>menu</button>
    )
  };

  componentDidMount() {
    this.popper = new Popper(this.toggleRef, this.menuRef, {
      placement: this.props.placement || 'bottom-start'
    });
  }

  _renderDownshiftChildren = downshift => {
    const children = React.Children.toArray(this.props.children);
    const toggleComponent = this.props.toggle(downshift);

    const shouldFilterOptions =
      get(toggleComponent, 'type.displayName', '') === 'Input';

    const filteredChildren = shouldFilterOptions
      ? children.filter(
          child =>
            !downshift.inputValue ||
            (child as React.ReactElement<any>).props.value.includes(
              downshift.inputValue
            )
        )
      : children;

    return (
      <div>
        <div ref={ref => (this.toggleRef = ref)} children={toggleComponent} />

        <div ref={ref => (this.menuRef = ref)} className={style.menu}>
          <div {...downshift.getMenuProps()}>
            {downshift.isOpen && (
              <Menu>
                {filteredChildren.map((child, key) => {
                  const childProps = (child as React.ReactElement<any>).props;

                  return React.cloneElement(child as React.ReactElement<any>, {
                    ...downshift.getItemProps({
                      item: childProps,
                      disabled: childProps.disabled
                    }),
                    selected:
                      get(downshift, 'selectedItem.children', '') ===
                      childProps.children,
                    highlighted: downshift.highlightedIndex === key
                  });
                })}
              </Menu>
            )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div {...style('root')}>
        <Downshift
          itemToString={item => (item ? item.children : '')}
          onChange={this.props.onChange}
          children={this._renderDownshiftChildren}
        />
      </div>
    );
  }
}
