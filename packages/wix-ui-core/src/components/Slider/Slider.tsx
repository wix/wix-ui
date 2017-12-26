import * as React from 'react';
import * as PropTypes from 'prop-types';
import {createHOC} from '../../createHOC';

interface SliderProps {
    min: PropTypes.number;
    max: PropTypes.number;
    value: PropTypes.number;
    onChange: PropTypes.func.isRequired;
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
