import * as React from 'react';
import {Checkbox} from '../../src/components/Checkbox/Checkbox';
import style from '../../src/components/Checkbox/CheckboxStyle.st.css';
import {CheckboxChecked, CheckboxIndeterminate} from 'wix-ui-icons-common/system';

export class CheckboxStory extends React.Component<{}, { checked: boolean }> {
  state = {checked: false};

  render() {
    return (
      <div style={{height: '100px', width: '100px'}}>
        <Checkbox
          {...style('root')}
          checked={this.state.checked}
          onChange={() => this.setState({checked: !this.state.checked})}
          data-hook="storybook-checkbox"
          checkedIcon={<CheckboxChecked />}
          indeterminateIcon={<CheckboxIndeterminate />}
        />
      </div>
    );
  }
}
