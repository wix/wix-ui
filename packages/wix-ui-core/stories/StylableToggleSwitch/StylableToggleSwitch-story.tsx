import * as React from 'react';
import {StylableToggleSwitch} from '../../src/components/StylableToggleSwitch';
import BOStylableToggleSwitch from '../../src/components/StylableToggleSwitch/backoffice/ToggleSwitch';

export class StylableToggleSwitchStory extends React.Component<{}, {checked: boolean}> {
  state = {checked: false};

  render() {
    return (
      <StylableToggleSwitch
        checked={this.state.checked}
        onChange={() => this.setState({checked: !this.state.checked})}
        data-hook="story-StylableToggleSwitch"
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
        data-hook="story-StylableToggleSwitch"
        size="small"
        skin="success"
        />
    );
  }
}
