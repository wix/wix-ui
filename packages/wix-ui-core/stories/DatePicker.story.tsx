import * as React from 'react';
import {DatePicker, OnChangeEvent} from '../src/components/DatePicker/DatePicker';

// export class DatePickerStory extends React.Component<{}, { selectedDay: string }> {
//   state = {selectedDay: '25'};

//   handleSelectedDayChange = ({value} : OnChangeEvent) => {
//     this.setState({selectedDay: value})
//   }

//   render() {
//     return (
//       <div style={{height: '100px', width: '100px'}}>
//         <DatePicker
//           selectedDay={this.state.selectedDay}
//           onChange={this.handleSelectedDayChange}
//         />
//       </div>
//     );
//   }
// }

const DatePickerStory = () => {
  return (
    <div style={{height: '100px', width: '100px'}}>
      <DatePicker
        selectedDay={this.state.selectedDay}
        onChange={this.props.onChange}
      />
    </div>
  );
};

export default {
  category: 'Components',
  name: 'DatePicker',
  storyName: 'DatePicker',
  component: DatePickerStory,
  componentPath: '../src/components/DatePicker',

  componentProps: setState => ({
    selectedDay: '25',
    onChange: selectedDay => setState({selectedDay})
  }),

  exampleProps: {
    onChange: () => '24'
  }
};
