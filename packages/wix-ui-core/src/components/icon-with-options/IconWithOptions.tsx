import * as React from 'react';
import { style, classes } from './IconWithOptions.st.css';
import { Dropdown } from '../dropdown';
import { Placement } from '../popover';
import { Option } from '../dropdown-option';
import { HOVER, OPEN_TRIGGER_TYPE } from '../dropdown/constants';

export interface IconWithOptionsProps {
  /** The location to display the content */
  placement?: Placement;
  /** The dropdown options array */
  options: Option[];
  /** Trigger type to open the content */
  openTrigger?: OPEN_TRIGGER_TYPE;
  /** Handler for when an option is selected */
  onSelect?(option: Option): void;
  /** Handler for when an option is deselected */
  onDeselect?(option: Option): void;
  /** initial selected option ids */
  initialSelectedIds?: (string | number)[];
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
export const IconWithOptions: React.FunctionComponent<IconWithOptionsProps> = props => {
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
      className={style(classes.root, {})}
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
      <img src={iconUrl} tabIndex={5} />
    </Dropdown>
  );
};

IconWithOptions.displayName = 'IconWithOptions';
IconWithOptions.defaultProps = {
  openTrigger: HOVER,
  placement: 'bottom',
  multi: false,
  initialSelectedIds: [],
  onSelect: () => null,
  onDeselect: () => null,
};
