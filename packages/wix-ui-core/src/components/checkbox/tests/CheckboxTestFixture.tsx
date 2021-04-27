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

  render() {
    return (
      <div>
        <Checkbox
          onFocusByKeyboard={() =>
            this.setState({ isOnFocusByKeyboardCalled: true })
          }
          checkedIcon={<CheckboxChecked />}
          onChange={() => {}}
          data-hook={`checkbox-first`}
        />
        <Checkbox
          checkedIcon={<CheckboxChecked />}
          onChange={() => {}}
          checked={this.state.isOnFocusByKeyboardCalled}
          data-hook={`checkbox-second`}
        />
      </div>
    );
  }
}
