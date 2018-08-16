import * as React from 'react';
import style from './DatePicker.st.css';
import { Day , OnClickEvent} from './Day';
const range = require('lodash/range');
export interface OnChangeEvent {
    value: string;
    event: React.MouseEvent;
}

export interface DatePickerProps{
    selectedDay?: string;
    onChange?:  ({value, event} : OnChangeEvent) => void;
    selectedCurrentDate?: string;
};


export class DatePicker extends React.Component<DatePickerProps> {    
    currentDate = new Date();
    currentDay = this.currentDate.getDate();
    calendarDays= range(1,31);

    handleSelectedDayChange = ({value ,event} : OnClickEvent) => {
        this.props.onChange && this.props.onChange({value, event});
    }
    
    render () {
        return (
            <div {...style('root', {}, this.props)} >
                <div className={style.displayDate}>
                    {this.props.selectedCurrentDate ? this.props.selectedCurrentDate+ '/07/2018' : this.currentDate.toLocaleDateString() }
                </div>
                {this.calendarDays.map(d => 
                <Day isCurrent={d == this.currentDay}
                 onClick={this.handleSelectedDayChange}
                 isSelected={d == this.props.selectedDay}
                 className={style.day}
                 value={d}
                 label={d}
                 key={d}/>)}
            </div>
        );
    };
}
