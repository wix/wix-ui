import * as React from 'react';
import {RadioButton, RadioButtonProps} from '../../src/components/RadioButton/RadioButton';

export class RadioButtonStory extends React.Component<{}, {checkedIdx: string}> {
  state = {
    checkedIdx: '1'
  };

  createRadio(props: RadioButtonProps = {}) {
    return <RadioButton
              key={props.label + props.value}
              label={<span>props.label</span>}
              checkedIcon={<span>🔘</span>}
              uncheckedIcon={<span>⚪</span>}
              checked={this.state.checkedIdx === props.value}
              onChange={() => this.setState({checkedIdx: props.value})}
              data-hook={`radio-story-${props.value}`}
              {...props}/>;
  }

  render() {
    return (
      <div style={{fontSize: '20px'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h3>Radio Button</h3>
          {['1', '2', '3', '4'].map(value => this.createRadio({value, label: `Star ${value}`}))}
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h3>Radio Buttons - disabled</h3>
          {['unchecked', 'checked']
            .map((value, idx) => this.createRadio({checked: !!idx, label: `Disabled ${value}`, value: '1', disabled: true}))}
        </div>
      </div>
    );
  }
}
