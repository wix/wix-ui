import * as React from 'react';
import Slider from '../../src/components/Slider';

export class SliderStory extends React.Component {
  state = {wrapperSize: 80, continuous: false};

  render() {
    return (
      <div style={{width: '100%', height: '25px'}}>
        <table>
          <tr>
            <td>
              Wrapper size:
            </td>
            <td>
              <input type="range" min={0} max={500} onChange={ev => this.setState({wrapperSize: ev.target.value})} style={{width: 200}}/>
            </td>
            <td>
              Continuous?
            </td>
            <td>
              <input type="checkbox" onClick={() => this.setState({continuous: !this.state.continuous})} checked={this.state.continuous}/>
            </td>
          </tr>
        </table>

        <br/>

        <div style={{width: '100%', height: this.state.wrapperSize, background: '#f2e8e8'}}>
          <StatefulSlider step={this.state.continuous ? null : 0.1} min={1} max={10} value={3} />
        </div>
        <br/>
        <div style={{transform: 'translate(500px)', width: this.state.wrapperSize, height: 800, background: '#f2e8e8'}}>
          <StatefulSlider vertical step={this.state.continuous ? null : 1} min={0} max={100} value={0}/>
        </div>
      </div>
    );
  }
}

class StatefulSlider extends React.Component<any, {value: number}> {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  handleChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <Slider
        {...this.props}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
