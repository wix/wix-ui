import * as React from 'react';
import style from './IconWithOptions.st.css';
import {Dropdown} from '../../baseComponents/Dropdown';
import {Placement} from '../Popover';
import {Option, optionPropType} from '../../baseComponents/DropdownOption';
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
  /** set true for multiple selection, false for single */
  multi?: boolean;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
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
      multi,
      iconUrl,
      fixedHeader,
      fixedFooter,
    } = props;

  return (
    <Dropdown
      {...style('root', {}, props)}
      options={options}
      placement={placement}
      openTrigger={openTrigger}
      multi={multi}
      onSelect={onSelect}
      onInitialSelectedOptionsSet={() => null}
      showArrow
      fixedFooter={fixedFooter}
      fixedHeader={fixedHeader}
      onDeselect={onDeselect}
      initialSelectedIds={initialSelectedIds}
    >
      <img
        src={iconUrl}
        tabIndex={5}
      />
    </Dropdown>);
  };

IconWithOptions.displayName = 'IconWithOptions';
IconWithOptions.defaultProps = {
  openTrigger: HOVER,
  placement: 'bottom',
  multi: false,
  initialSelectedIds: [],
  onSelect: () => null,
  onDeselect: () => null
};

IconWithOptions.propTypes = {
  /** The location to display the content */
  placement: oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']),
  /** The dropdown options array */
  options: arrayOf(optionPropType).isRequired,
  /** Trigger type to open the content */
  openTrigger: oneOf(['click', 'hover']),
  /** Handler for when an option is selected */
  onSelect: func,
  /** Handler for when an option is deselected */
  onDeselect: func,
  /** initial selected option ids */
  initialSelectedIds: arrayOf(oneOfType([number, string])),
  /** set true for multiple selection, false for single */
  multi: bool,
  /** An element that always appears at the top of the options */
  fixedHeader: node,
  /** An element that always appears at the bottom of the options */
  fixedFooter: node,
  /** Icon url to display */
  iconUrl: string.isRequired
};
