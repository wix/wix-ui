import * as React from 'react';
import style from './IconWithOptions.st.css';
import {Dropdown} from '../../baseComponents/Dropdown';
import {Placement, PlacementPropType} from '../../baseComponents/Popover';
import {Option} from '../../baseComponents/DropdownOption';
import {HOVER, CLICK, OPEN_TRIGGER_TYPE} from '../../baseComponents/Dropdown/constants';
import {oneOf, string, object, func, arrayOf, bool, oneOfType, number, node} from 'prop-types';

export interface IconWithOptionsProps {
  /** The location to display the content */
  placement?: Placement;
  /** The dropdown options array */
  options: Array<Option>;
  /** Trigger type to open the content */
  openTrigger?: OPEN_TRIGGER_TYPE;
  /** Handler for when an option is selected */
  onSelect?: (option: Option) => void;
  /** Handler for when an option is deselected */
  onDeselect?: (option: Option) => void;
  /** initial selected option ids */
  initialSelectedIds?: Array<string | number>;
  /** Should close content on select */
  closeOnSelect?: boolean;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** Maximum height of the options */
  optionsMaxHeight?: number;
  /** Icon url to display */
  iconUrl: string;
}

/**
 * IconWithOptions
 */
export const IconWithOptions: React.SFC<IconWithOptionsProps> =
  props => {
    const {
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
    } = props;

  return (
    <Dropdown
      {...style('root', {}, props)}
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
      <img
        src={iconUrl}
        tabIndex={5}/>
    </Dropdown>);
  };

IconWithOptions.displayName = 'IconWithOptions';
IconWithOptions.defaultProps = {
  openTrigger: HOVER,
  placement: 'bottom',
  closeOnSelect: true,
  initialSelectedIds: [],
  onSelect: () => null,
  onDeselect: () => null
};

IconWithOptions.propTypes = {
  /** The location to display the content */
  placement: PlacementPropType,
  /** The dropdown options array */
  options: arrayOf(object).isRequired,
  /** Trigger type to open the content */
  openTrigger: oneOf([CLICK, HOVER]),
  /** Handler for when an option is selected */
  onSelect: func,
  /** Handler for when an option is deselected */
  onDeselect: func,
  /** initial selected option ids */
  initialSelectedIds: oneOfType([arrayOf(number), arrayOf(string)]),
  /** Should close content on select */
  closeOnSelect: bool,
  /** An element that always appears at the top of the options */
  fixedHeader: node,
  /** An element that always appears at the bottom of the options */
  fixedFooter: node,
  /** Maximum height of the options */
  optionsMaxHeight: number,
  /** Icon url to display */
  iconUrl: string.isRequired
};
