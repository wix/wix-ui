import * as React from 'react';
import style from './Day.st.css';


export interface OnClickEvent {
    value: string;
    event: React.MouseEvent;
}

export interface DayProps {
    className?: string;
    value: string;
    label?: React.ReactNode;
    onClick?: ({value, event} : OnClickEvent) => void;
    isCurrent?: boolean;
    isSelected?: boolean;
}

export class Day extends React.Component<DayProps> {
    state = {
        isHover: false
    };
  
    private handleClick = (e: React.MouseEvent) => {
        this.props.onClick && this.props.onClick({value: this.props.value, event: e});
    };

    toggleHover = () => this.setState({ isHover: !this.state.isHover });
    
    render () {
        const {value, label, onClick, isCurrent} = this.props;
        const styleStates = {
            isCurrent: isCurrent,
            isHovered: this.state.isHover,
            isSelected: this.props.isSelected
        }

        return (
            <button 
            value={value}
             onClick={this.handleClick}
              onMouseEnter={this.toggleHover}
               onMouseLeave={this.toggleHover}
                {...style('root', styleStates , this.props)} >
                {label}
            </button>
        );
    };
}
