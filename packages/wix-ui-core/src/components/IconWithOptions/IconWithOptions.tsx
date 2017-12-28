import * as React from 'react';
import Dropdown from '../Dropdown';
import {Placement} from '../Popover';
import {HOVER_TYPE, CLICK_TYPE, HOVER, CLICK} from '../Dropdown/Dropdown';
import {Option} from '../Dropdown/DropdownContent';
import {createHOC} from '../../createHOC';
import {oneOf, string, object, func, arrayOf} from 'prop-types';

export interface IconWithOptionsProps {
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  placement?: Placement;
  options: Array<Option>;
  onSelect?: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  iconUrl: string;
}

const IconWithOptions: React.SFC<IconWithOptionsProps> = props => {
  const {options, openTrigger, placement, onSelect, iconUrl} = props;

  return (
    <Dropdown
      options={options}
      placement={placement}
      openTrigger={openTrigger}
      onSelect={onSelect}>
      {() => <img src={iconUrl}/>}
    </Dropdown>);
};

IconWithOptions.defaultProps = {
  openTrigger: HOVER,
  placement: 'bottom',
  options: []
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
  iconUrl: string.isRequired
};

export default createHOC(IconWithOptions);
