import * as React from 'react';
import Dropdown from '../Dropdown';
import {SharedDropdownProps, DropdownElementProps} from '../Dropdown/Dropdown';
import {HOVER, CLICK, SINGLE_SELECT, MULTI_SELECT} from '../Dropdown/constants';
import {createHOC} from '../../createHOC';
import {oneOf, string, object, func, arrayOf} from 'prop-types';

export interface IconWithOptionsProps extends SharedDropdownProps {
  iconUrl: string;
}

const IconWithOptions: React.SFC<IconWithOptionsProps> =
  ({options, openTrigger, placement, onSelect, iconUrl, mode}) => (
    <Dropdown
      options={options}
      placement={placement}
      openTrigger={openTrigger}
      mode={mode}
      onSelect={onSelect}>
      {
        (props: DropdownElementProps) =>
          <img
            src={iconUrl}
            tabIndex={5}
            onKeyDown={props.onKeyDown}/>
      }
    </Dropdown>
  );

IconWithOptions.defaultProps = {
  openTrigger: HOVER,
  placement: 'bottom',
  options: [],
  mode: SINGLE_SELECT
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
  mode: oneOf([SINGLE_SELECT, MULTI_SELECT])
};

export default createHOC(IconWithOptions);
