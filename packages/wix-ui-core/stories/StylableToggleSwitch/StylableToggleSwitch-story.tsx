import * as React from 'react';
import {StylableToggleSwitch} from '../../src/components/StylableToggleSwitch';
import style from '../../src/components/StylableToggleSwitch/toggle-switch.st.css';
import BOStylableToggleSwitch from '../../src/components/StylableToggleSwitch/backoffice/ToggleSwitch';

export class StylableToggleSwitchStory extends React.Component<{}, {checked: boolean}> {
  state = {checked: false};

  render() {
    return (
      <StylableToggleSwitch
        checked={this.state.checked}
        onChange={() => this.setState({checked: !this.state.checked})}
        dataHook="story-StylableToggleSwitch"
        themedStyle={style}
        />
    );
  }
}

export class BOStylableToggleSwitchStory extends React.Component<{}, {checked: boolean}> {
  state = {checked: false};

  render() {
    return (
      <BOStylableToggleSwitch
        checked={this.state.checked}
        onChange={() => this.setState({checked: !this.state.checked})}
        dataHook="story-StylableToggleSwitch"
        />
    );
  }
}
