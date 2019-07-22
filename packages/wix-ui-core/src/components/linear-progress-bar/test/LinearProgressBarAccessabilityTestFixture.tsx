import * as React from 'react';
import { LinearProgressBar } from '../LinearProgressBar';
import style from './style.st.css';
export enum DataHook {
  ProgressBar = 'progress-bar',
}

interface LinearProgressBarAccessabillityFixtureState {
  value: number;
}
export class LinearProgressBarAccessabilityFixture extends React.Component<
  {},
  LinearProgressBarAccessabillityFixtureState
> {
  state = {
    value: 0,
  };

  componentDidMount() {
    setInterval(this.increment, 350);
  }

  increment = () => {
    const { value } = this.state;
    const newValue = value + 1;
    this.setState({ value: newValue });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <LinearProgressBar
          {...style('root')}
          aria-valuetext="Upload form file"
          value={value}
          aria-live="assertive"
        ></LinearProgressBar>
      </div>
    );
  }
}
