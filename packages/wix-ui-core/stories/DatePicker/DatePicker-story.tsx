import * as React from 'react';
import {DatePicker, OnChangeEvent} from '../../src/components/DatePicker/DatePicker';
import {style} from './style.st.css'

export interface DatePickerStoryState {
  selectedDay: string;
  selectedCurrentDate: string
}

export class DatePickerStory extends React.Component<{},DatePickerStoryState> {
  state = {selectedDay: '25', selectedCurrentDate: ''};

  handleSelectedDayChange = ({value} : OnChangeEvent) => {
    this.setState({selectedDay: value, selectedCurrentDate: value});
  }

  render() {
    return (
      <div>
        <DatePicker
          selectedDay={this.state.selectedDay}
          onChange={this.handleSelectedDayChange}
          selectedCurrentDate={this.state.selectedCurrentDate}
        />
      </div>
    );
  }
}
