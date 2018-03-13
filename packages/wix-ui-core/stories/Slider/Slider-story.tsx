import * as React from 'react';
import {Slider} from '../../src/components/Slider';

export class SliderStory extends React.Component {
  state = {wrapperSize: 80, continuous: false, vertical: false, tickMarksPosition: 'default', tooltipPosition: 'default'};

  render() {
    const vertical = this.state.vertical;
    const horizontalStyle = {
      width: '100%', height: this.state.wrapperSize, background: '#f2e8e8', marginTop: 20
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
            <td>
              Tick Marks Position
            </td>
            <td>
              <select value={this.state.tickMarksPosition} onChange={ev => this.setState({tickMarksPosition: ev.target.value})}>
                <option value="none">None</option>
                <option value="default">Default</option>
                <option value="middle">Middle</option>
                <option value="across">Across</option>
              </select>
            </td>
            <td>
              Tooltip position
            </td>
            <td>
              <select value={this.state.tooltipPosition} onChange={ev => this.setState({tooltipPosition: ev.target.value})}>
                <option value="default">Default</option>
                <option value="across">Across</option>
              </select>
            </td>
          </tr>
        </table>

        <br/>

        <div key="horiz" style={vertical ? verticalStyle : horizontalStyle}>
          <StatefulSlider vertical={this.state.vertical} tooltipPosition={this.state.tooltipPosition} tickMarksPosition={this.state.tickMarksPosition} step={this.state.continuous ? null : 0.1} min={1} max={10} value={3} />
        </div>
        <div key="horiz-rtl" style={horizontalStyle}>
          <StatefulSlider rtl tooltipPosition={this.state.tooltipPosition} tickMarksPosition={this.state.tickMarksPosition} step={this.state.continuous ? null : 0.1} min={1} max={10} value={3} />
        </div>
        <br/>
        <div key="vert" style={!vertical ? verticalStyle : horizontalStyle}>
          <StatefulSlider vertical={!this.state.vertical} tooltipPosition={this.state.tooltipPosition} tickMarksPosition={this.state.tickMarksPosition} step={this.state.continuous ? null : 1} min={0} max={100} value={0}/>
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
