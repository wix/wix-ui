import * as React from 'react';
import { Checkbox, CheckboxProps } from '..';
import {
  CheckboxChecked,
  CheckboxIndeterminate,
} from 'wix-ui-icons-common/system';

export class CheckboxTestFixture extends React.Component {
  state = {
    checkedIdx: '1',
    isOnFocusByKeyboardCalled: false,
  };

  createCheckbox(props: CheckboxProps = {}) {
    return (
      <Checkbox
        key={`${props.value}`}
        checkedIcon={<CheckboxChecked />}
        indeterminateIcon={<CheckboxIndeterminate />}
        checked={this.state.checkedIdx === props.value}
        onChange={() => this.setState({ checkedIdx: props.value })}
        data-hook={`checkbox-story-${props.value}`}
        {...props}
      />
    );
  }

  render() {
    return (
      <div style={{ fontSize: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Checkbox</h3>
          {['1', '2', '3', '4'].map((value) => this.createCheckbox({ value }))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Checkbox - disabled</h3>
          {['unchecked', 'checked'].map((value, idx) =>
            this.createCheckbox({
              checked: !!idx,
              value: '1',
              disabled: true,
            })
          )}
        </div>
        <div>
          <Checkbox
            onFocusByKeyboard={() =>
              this.setState({ isOnFocusByKeyboardCalled: true })
            }
            checkedIcon={<CheckboxChecked />}
            indeterminateIcon={<CheckboxIndeterminate />}
            onChange={() => {}}
            data-hook={`checkbox-first`}
          />
          <Checkbox
            checkedIcon={<CheckboxChecked />}
            indeterminateIcon={<CheckboxIndeterminate />}
            onChange={() => {}}
            checked={this.state.isOnFocusByKeyboardCalled}
            data-hook={`checkbox-second`}
          />
        </div>
      </div>
    );
  }
}
