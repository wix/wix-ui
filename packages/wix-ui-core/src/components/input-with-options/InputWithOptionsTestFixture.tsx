import * as React from 'react';
import { InputWithOptions } from './index';
import { generateOptions } from '../dropdown-option/OptionsExample';

const options = generateOptions();

export enum DataHook {
  inputWithOptions = 'storybook-input-with-options',
  onSelectCount = 'on-select-count',
  onManualInputCount = 'on-manual-input-count',
}

const emptyStateStyle: React.CSSProperties = {
  padding: '50px',
  fontWeight: 'bold',
  background: 'rgba(200, 200, 200, 0.4)',
};

export class InputWithOptionsTestFixture extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      onSelectCount: 0,
      onManualInputCount: 0,
    };
  }

  handleOnSelect = () => {
    this.setState({
      onSelectCount: this.state.onSelectCount + 1,
    });
  };

  handleOnManualInput = () => {
    this.setState({
      onManualInputCount: this.state.onManualInputCount + 1,
    });
  };

  handleOnChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { onSelectCount, onManualInputCount } = this.state;
    return (
      <div>
        <InputWithOptions
          onSelect={this.handleOnSelect}
          onManualInput={this.handleOnManualInput}
          options={options}
          data-hook={DataHook.inputWithOptions}
          emptyStateMessage={'No results'}
          emptyStateStyle={emptyStateStyle}
          inputProps={{
            value: this.state.value,
            onChange: this.handleOnChange,
          }}
        />
        <div>
          onSelectCount:{' '}
          <span data-hook={DataHook.onSelectCount}>{onSelectCount}</span>
        </div>
        <div>
          onManualInputCount:{' '}
          <span data-hook={DataHook.onManualInputCount}>
            {onManualInputCount}
          </span>
        </div>
      </div>
    );
  }
}
