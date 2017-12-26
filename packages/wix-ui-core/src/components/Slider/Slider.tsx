import * as React from 'react';
import * as PropTypes from 'prop-types';
import {createHOC} from '../../createHOC';

interface SliderProps {
    min: PropTypes.number;
    max: PropTypes.number;
}

class Slider extends React.PureComponent<SliderProps> {
    render() {
        return <input type="range" min={0} max={20}/>;
    }
}

export default createHOC(Slider);
