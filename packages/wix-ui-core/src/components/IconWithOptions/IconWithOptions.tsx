import * as React from 'react';
import {Dropdown} from '../../baseComponents/Dropdown';
import {Placement} from '../../baseComponents/Popover/Popover';
import {TriggerElementProps} from '../../baseComponents/Dropdown/Dropdown';
import {Option} from '../../baseComponents/DropdownOption';
import {HOVER, CLICK, CLICK_TYPE, HOVER_TYPE} from '../../baseComponents/Dropdown/constants';
import {createHOC} from '../../createHOC';
import {oneOf, string, object, func, arrayOf, bool, oneOfType, number, node} from 'prop-types';

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
  fixedHeader?: React.ReactNode;
  fixedFooter?: React.ReactNode;
  optionsMaxHeight?: number;
}

const IconWithOptions: React.SFC<IconWithOptionsProps> =
  ({
    placement,
    options,
    openTrigger,
    onSelect,
    onDeselect,
    initialSelectedIds,
    closeOnSelect,
    iconUrl,
    fixedHeader,
    fixedFooter,
    optionsMaxHeight
  }) => (
    <Dropdown
      options={options}
      placement={placement}
      openTrigger={openTrigger}
      closeOnSelect={closeOnSelect}
      onSelect={onSelect}
      showArrow={true}
      optionsMaxHeight={optionsMaxHeight}
      fixedFooter={fixedFooter}
      fixedHeader={fixedHeader}
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
  classes: object.isRequired,
  /** An element that always appears at the top of the options */
  fixedHeader: node,
  /** An element that always appears at the bottom of the options */
  fixedFooter: node,
  /** Maximum height of the options */
  optionsMaxHeight: number
};

export default createHOC(IconWithOptions);
