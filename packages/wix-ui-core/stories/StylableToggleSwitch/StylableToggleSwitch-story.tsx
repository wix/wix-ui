import * as React from 'react';
import {ToggleSwitch as StylableToggleSwitch} from '../../src/components/StylableToggleSwitch';
import style from './style.st.css';

export class StylableToggleSwitchStory extends React.Component<{}, {checked: boolean}> {
  state = {checked: false};

  render() {
    return (
      <div style={{height: '100px', width: '100px'}}>
        <StylableToggleSwitch
          {...style('root')}
          checked={this.state.checked}
          onChange={() => this.setState({checked: !this.state.checked})}
          data-hook="story-StylableToggleSwitch"
        />
      </div>
    );
  }
}
