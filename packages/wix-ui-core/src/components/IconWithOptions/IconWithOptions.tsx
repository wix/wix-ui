import * as React from 'react';
import Dropdown from '../Dropdown';
import {SharedDropdownProps, TriggerElementProps} from '../Dropdown/Dropdown';
import {HOVER, CLICK} from '../Dropdown/constants';
import {createHOC} from '../../createHOC';
import {oneOf, string, object, func, arrayOf, bool} from 'prop-types';

export interface IconWithOptionsProps extends SharedDropdownProps {
  iconUrl: string;
}

const IconWithOptions: React.SFC<IconWithOptionsProps> =
  ({options, openTrigger, placement, onSelect, iconUrl, closeOnSelect}) => (
    <Dropdown
      options={options}
      placement={placement}
      openTrigger={openTrigger}
      closeOnSelect={closeOnSelect}
      onSelect={onSelect}>
      {
        ({onKeyDown}: TriggerElementProps) =>
          <img
            src={iconUrl}
            tabIndex={5}
            onKeyDown={onKeyDown}/>
      }
    </Dropdown>
  );

IconWithOptions.defaultProps = {
  openTrigger: HOVER,
  placement: 'bottom',
  options: [],
  closeOnSelect: true
};

IconWithOptions.propTypes = {
  openTrigger: oneOf([CLICK, HOVER]),
  /** The location to display the content */
  placement: string,
  /** The dropdown options array */
  options: arrayOf(object).isRequired,
  /** Handler for when an option is selected */
  onSelect: func,
  /** The icon url to display */
  iconUrl: string.isRequired,
  /** Dropdown mode - single / multi select */
  closeOnSelect: bool
};

export default createHOC(IconWithOptions);
