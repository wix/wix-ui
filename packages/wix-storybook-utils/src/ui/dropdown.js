import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import classnames from 'classnames';
import CloseIcon from 'wix-ui-icons-common/system/Close';

import styles from './styles.scss';
import Input from './input';

const Dropdown = ({
  value,
  options,
  selectedOption,
  onSelect,
  onChange,
  placeholder,
  onClear
}) => (
  <Downshift
    onChange={onSelect}
    itemToString={item => (item ? item.value : '')}
    initialSelectedItem={selectedOption}
    initialInputValue={value}
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      openMenu,
      clearSelection
    }) => (
      <div className={styles.dropdown}>
        <Input
          {...getInputProps({
            value: inputValue,
            placeholder,
            onChange: e => onChange(e.target.value),
            onClick: openMenu
          })}
        />

        {onClear &&
          inputValue && (
            <div
              className={styles.dropdownClear}
              onClick={() => {
                clearSelection();
                onClear();
              }}
              children={<CloseIcon size="7px"/>}
            />
          )}

        <ul className={styles.dropdownMenu} {...getMenuProps()}>
          {isOpen &&
            options.map((option, index) => (
              <li
                key={option.value}
                {...getItemProps({
                  index,
                  item: option,
                  className: classnames(styles.dropdownMenuItem, {
                    [styles.dropdownMenuItemSelected]:
                      selectedItem && selectedItem.id === option.id,
                    [styles.dropdownMenuItemHighlighted]:
                      highlightedIndex === index
                  })
                })}
              >
                {option.value}
              </li>
            ))}
        </ul>
      </div>
    )}
  </Downshift>
);

Dropdown.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.any,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  placeholder: PropTypes.string
};

export default Dropdown;
