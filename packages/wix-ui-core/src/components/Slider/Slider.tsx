import * as React from 'react';
import {createHOC} from '../../createHOC';

export interface SliderProps {
    min?: number;
    max?: number;
    value?: number;
    onChange?: () => any;
    onInput?: () => any;
    classes?: any;
    scaleMarks?: boolean;
}

class Slider extends React.PureComponent<SliderProps> {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root} style={{width: '100%', height: '100%'}}>
                <input
                    className={classes.slider}
                    type="range"
                    value={this.props.value}
                    min={this.props.min}
                    max={this.props.max}
                    onChange={this.props.onChange}
                    onInput={this.props.onInput}
                />
            </div>
        );
    }
}

export default createHOC(Slider);
