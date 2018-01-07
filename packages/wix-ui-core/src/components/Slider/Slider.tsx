import * as React from 'react';
import {createHOC} from '../../createHOC';

export interface SliderProps {
    min?: number;
    max?: number;
    value?: number;
    onChange?: () => any;
}

class Slider extends React.PureComponent<SliderProps> {
    render() {
        return <input
            type="range"
            value={this.props.value}
            min={this.props.min}
            max={this.props.max}
            onChange={this.props.onChange}
        />;
    }
}

export default createHOC(Slider);
