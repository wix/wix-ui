import * as React from 'react';
import { RadioButton, RadioButtonProps } from '..';

export class RadioButtonTestFixture extends React.Component {
  state = {
    checkedIdx: '1',
    afterFocusClickedButton: undefined,
  };

  createRadio(props: RadioButtonProps = {}) {
    return (
      <RadioButton
        key={props.label + props.value}
        label={<span>props.label</span>}
        checkedIcon={<span>🔘</span>}
        uncheckedIcon={<span>⚪</span>}
        checked={this.state.checkedIdx === props.value}
        onChange={() => this.setState({ checkedIdx: props.value })}
        data-hook={`radio-story-${props.value}`}
        {...props}
      />
    );
  }

  render() {
    return (
      <div style={{ fontSize: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Radio Button</h3>
          {['1', '2', '3', '4'].map(value =>
            this.createRadio({ value, label: `Star ${value}` }),
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Radio Buttons - disabled</h3>
          {['unchecked', 'checked'].map((value, idx) =>
            this.createRadio({
              checked: !!idx,
              label: `Disabled ${value}`,
              value: '1',
              disabled: true,
            }),
          )}
        </div>
        <div>
          <RadioButton
            label={<span>props.label</span>}
            checkedIcon={<span>🔘</span>}
            uncheckedIcon={<span>⚪</span>}
            onChange={() => {}}
            data-hook={`radio-button-first`}
          />
          <RadioButton
            onFocusByKeyboard={() =>
              this.setState({
                afterFocusClickedButton: this.createRadio({
                  checked: false,
                  value: 'focus-clicked',
                  disabled: true,
                }),
              })
            }
            label={<span>props.label</span>}
            checkedIcon={<span>🔘</span>}
            uncheckedIcon={<span>⚪</span>}
            onChange={() => {}}
            data-hook={`radio-button-second`}
          />
          {this.state.afterFocusClickedButton}
        </div>
      </div>
    );
  }
}
