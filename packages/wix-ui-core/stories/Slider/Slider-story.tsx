import * as React from 'react';
import Slider from '../../src/components/Slider';

export class SliderStory extends React.Component {
  state = {handleSize: 35};

  render() {
    return (
      <div style={{width: '100%', height: '25px'}}>
        <table>
          <tr>
            <td>
              Handle size:
            </td>
            <td>
              <input type="range" min={0} max={200} onChange={ev => this.setState({handleSize: ev.target.value})} />
            </td>
          </tr>
        </table>

        <br/>

        <div style={{width: '100%', height: 80, background: 'red'}}>
          <StatefulSlider min={1} max={100} value={2} handleSize={this.state.handleSize}/>
        </div>
        <br/>
        <div style={{transform: 'translate(500px)', width: 50, height: 400, background: 'blue'}}>
          <StatefulSlider vertical min={1} max={50} value={2} handleSize={this.state.handleSize}/>
        </div>
      </div>
    );
  }
}

class StatefulSlider extends React.Component<any, {value: number}> {
  state = {value: 4};

  handleChange(ev) {
    this.setState({value: ev.target.value});
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
