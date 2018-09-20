import * as React from 'react';
import Downshift from 'downshift';
import PopperJS from 'popper.js';
import {Manager, Target, Popper} from 'react-popper';
const get = require('lodash/get');

import style from './select.st.css';
import {Menu} from './menu';

type OptionId = number | string;

export interface SelectProps {
  toggle?: Function;
  children: React.ReactNode;
  placement?: PopperJS.Placement;
  onChange?: React.EventHandler<React.ChangeEvent<any>>;
  selected?: OptionId | Array<OptionId>;
}

export class Select extends React.PureComponent<SelectProps> {
  toggleRef: Element;
  menuRef: Element;
  popper: PopperJS;

  static defaultProps = {
    toggle: ({getToggleButtonProps}) => (
      <button {...getToggleButtonProps()}>menu</button>
    )
  };

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

    const selected = this.props.selected
      ? ensureArray(this.props.selected)
      : [];

    return (
      <div>
        <Target data-hook="select-toggle" children={toggleComponent} />

        <Popper placement="bottom-start" className={style.menu}>
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
                      get(downshift, 'selectedItem.value', '') ===
                        childProps.value || selected.includes(childProps.id),
                    highlighted: downshift.highlightedIndex === key
                  });
                })}
              </Menu>
            )}
          </div>
        </Popper>
      </div>
    );
  };

  render() {
    return (
      <Manager {...style('root')}>
        <Downshift
          itemToString={item => (item ? item.children : '')}
          onChange={this.props.onChange}
          children={this._renderDownshiftChildren}
        />
      </Manager>
    );
  }
}

function ensureArray(n) {
  return Array.isArray(n) ? n : [n];
}
