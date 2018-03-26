import * as React from 'react';
import * as PropTypes from 'prop-types';
import pStyle from './Slider.st.css';

export interface ThumbProps {
  shape: string;
  thumbPosition: Object;
  thumbSize: number;
  onMouseEnter: any;
  onMouseLeave: any;
}

export class Thumb extends React.Component<ThumbProps> {
  static propTypes = {
    shape: PropTypes.string.isRequired,
    thumbPosition: PropTypes.object.isRequired,
    thumbSize: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
  };

  render() {
    const {shape} = this.props;
    const ThumbShape = thumbShapeMap[shape];

    return (
      <div data-hook="thumb"
        className={pStyle.thumb}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={{
          ...this.props.thumbPosition,
          width: this.props.thumbSize,
          height: this.props.thumbSize
        }}
      >
        <ThumbShape/>
        {this.props.children}
      </div>
    );
  }
}

class CircleThumb extends React.Component<any> {
  render() {
    return (
      <div className={pStyle.thumbShape} style={{borderRadius: '50%'}}/>
    );
  }
}

const thumbShapeMap = {
  circle: CircleThumb
};
