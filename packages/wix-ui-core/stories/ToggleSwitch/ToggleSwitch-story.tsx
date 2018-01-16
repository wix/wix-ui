import * as React from 'react';
import {ToggleSwitch} from '../../src/components/ToggleSwitch';

export class ToggleSwitchStory extends React.Component<{}, {checked: boolean}> {
  state = {checked: false};

  render() {
    return (
      <ToggleSwitch
        checked={this.state.checked}
        onChange={() => this.setState({checked: !this.state.checked})}
        dataHook="story-toggleswitch"
        />
    );
  }
}
