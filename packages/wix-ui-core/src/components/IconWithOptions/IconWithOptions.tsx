import * as React from 'react';
import Dropdown from '../Dropdown';
import {Placement} from '../Popover/Popover';
import {TriggerElementProps} from '../Dropdown/Dropdown';
import {Option} from '../Dropdown/DropdownContent/DropdownContent';
import {HOVER, CLICK, CLICK_TYPE, HOVER_TYPE} from '../Dropdown/constants';
import {createHOC} from '../../createHOC';
import {oneOf, string, object, func, arrayOf, bool, oneOfType, number} from 'prop-types';

export interface IconWithOptionsClasses {
}

export interface IconWithOptionsProps {
  placement?: Placement;
  classes?: IconWithOptionsClasses;
  options: Array<Option>;
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  onSelect?: (option: Option) => void;
  onDeselect?: (option: Option) => void;
  initialSelectedIds?: Array<string | number>;
  closeOnSelect?: boolean;
  iconUrl: string;
}

const IconWithOptions: React.SFC<IconWithOptionsProps> =
  ({placement, options, openTrigger, onSelect, onDeselect, initialSelectedIds, closeOnSelect, iconUrl}) => (
    <Dropdown
      options={options}
      placement={placement}
      openTrigger={openTrigger}
      closeOnSelect={closeOnSelect}
      onSelect={onSelect}
      onDeselect={onDeselect}
      initialSelectedIds={initialSelectedIds}>
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
  closeOnSelect: true,
  initialSelectedIds: [],
  onSelect: () => null,
  onDeselect: () => null
};

IconWithOptions.propTypes = {
  /** Trigger type to open the content */
  openTrigger: oneOf([CLICK, HOVER]),
  /** The location to display the content */
  placement: string,
  /** The dropdown options array */
  options: arrayOf(object).isRequired,
  /** Handler for when an option is selected */
  onSelect: func,
  /** Handler for when an option is deselected */
  onDeselect: func,
  /** initial selected option ids */
  initialSelectedIds: oneOfType([arrayOf(number), arrayOf(string)]),
  /** Should close content on select */
  closeOnSelect: bool,
  /** Icon url to display */
  iconUrl: string.isRequired,
  /** Classes object */
  classes: object.isRequired
};

export default createHOC(IconWithOptions);
