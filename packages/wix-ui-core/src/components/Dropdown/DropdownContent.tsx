import * as React from 'react';
import Divider from '../Divider';
import * as uniqueId from 'lodash/uniqueId';
import {func, object, arrayOf} from 'prop-types';
import {OPTION, OPTION_TYPE, SEPARATOR, SEPARATOR_TYPE} from './constants';

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
    onOptionClick: func.isRequired
  };

  constructor(props) {
    super(props);

    this._renderOption = this._renderOption.bind(this);
  }

  _onOptionClick(option, evt) {
    this.props.onOptionClick(option, evt);
  }

  _renderOption(option) {
    switch (option.type) {
      case OPTION:
        return (
          <div
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
