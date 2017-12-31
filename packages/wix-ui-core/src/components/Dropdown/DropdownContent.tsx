import * as React from 'react';
import {func, object, arrayOf} from 'prop-types';
import {getRandomInt} from '../../utils';

export const OPTION = 'option';
export type OPTION_TYPE = 'option';

export const SEPARATOR = 'separator';
export type SEPARATOR_TYPE = 'separator';

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
    options: []
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
    const {onOptionClick} = this.props;
    onOptionClick && onOptionClick(option, evt);
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
        return (
          <div key={getRandomInt(1000, 2000)}>
            --------
          </div>
        );
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
