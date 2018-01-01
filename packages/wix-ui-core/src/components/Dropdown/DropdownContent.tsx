import * as React from 'react';
import {func, object, arrayOf, any} from 'prop-types';
import * as uniqueId from 'lodash/uniqueId';
import {OPTION, SEPARATOR, OPTION_TYPE, SEPARATOR_TYPE} from './constants';
import * as classNames from 'classnames';
import Divider from '../Divider';

export interface Option {
  id: number;
  value: any;
  displayName: any;
  type: OPTION_TYPE | SEPARATOR_TYPE;
  isDisabled: boolean;
}

export interface DropdownContentProps {
  options: Array<Option>;
  onOptionClick: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  selectedIds: Array<any>;
}

class DropdownContent extends React.PureComponent<DropdownContentProps> {

  static defaultProps = {
    options: [],
    onOptionClick: () => null
  };

  static propTypes = {
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Handler for when an option is clicked */
    onOptionClick: func.isRequired,
    /**  */
    selectedIds: arrayOf(any).isRequired
  };

  constructor(props) {
    super(props);

    this._renderOption = this._renderOption.bind(this);
  }

  _onOptionClick(option, evt) {
    this.props.onOptionClick(option, evt);
  }

  _renderOption(option) {
    const {selectedIds} = this.props;

    switch (option.type) {
      case OPTION:
        return (
          <div
            className={classNames({
              selected: !option.isDisabled && selectedIds.includes(option.id)
            })}
            key={option.id}
            onClick={option.isDisabled ? null : evt => this._onOptionClick(option, evt)}>
            {option.displayName}
          </div>
        );
      case SEPARATOR:
        return <Divider key={uniqueId(SEPARATOR)} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div data-hook="options-container">
        {(this.props.options || []).map(this._renderOption)}
      </div>
    );
  }
}

export default DropdownContent;
