import * as React from 'react';
import Slider from '../../src/components/Slider';

export class SliderStory extends React.Component {
  state = {wrapperSize: 80, continuous: false, vertical: false};

  render() {
    const vertical = this.state.vertical;
    const horizontalStyle = {
      width: '100%', height: this.state.wrapperSize, background: '#f2e8e8'
    };

    const verticalStyle = {
      transform: 'translate(500px)', width: this.state.wrapperSize, height: 800, background: '#f2e8e8'
    };

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
            <td>
              Vertical?
            </td>
            <td>
              <input type="checkbox" onClick={() => this.setState({vertical: !this.state.vertical})} checked={this.state.vertical}/>
            </td>
          </tr>
        </table>

        <br/>

        <div key="horiz" style={vertical ? verticalStyle : horizontalStyle}>
          <StatefulSlider vertical={this.state.vertical} step={this.state.continuous ? null : 0.1} min={1} max={10} value={3} />
        </div>
        <br/>
        <div key="vert" style={!vertical ? verticalStyle : horizontalStyle}>
          <StatefulSlider vertical={!this.state.vertical} step={this.state.continuous ? null : 1} min={0} max={100} value={0}/>
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
