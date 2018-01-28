import * as React from 'react';
import {ToggleSwitch as StylableToggleSwitch} from '../../src/components/StylableToggleSwitch';
import commonStyle from '../../src/components/StylableToggleSwitch/ToggleSwitchStyle.st.css';

export class StylableToggleSwitchStory extends React.Component<{}, {checked: boolean}> {
  state = {checked: false};

  render() {
    return (
      <div style={{height: '100px', width: '100px'}}>
        <StylableToggleSwitch
          {...commonStyle('root')}
          checked={this.state.checked}
          onChange={() => this.setState({checked: !this.state.checked})}
          data-hook="story-StylableToggleSwitch"
          />
        </div>
    );
  }
}
